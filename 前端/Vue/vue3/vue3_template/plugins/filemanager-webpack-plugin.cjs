'use strict';
// 需要手动安装 npm i schema-utils normalize-path --save-dev
var path = require('path');
var schemaUtils = require('schema-utils');
var normalizePath = require('normalize-path');
var fs = require('fs');
var fsExtra = require('fs-extra');
var isGlob = require('is-glob');
var fg = require('fast-glob');
var del = require('del');
var archiver = require('archiver');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var normalizePath__default = /*#__PURE__*/_interopDefaultLegacy(normalizePath);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var fsExtra__default = /*#__PURE__*/_interopDefaultLegacy(fsExtra);
var isGlob__default = /*#__PURE__*/_interopDefaultLegacy(isGlob);
var fg__default = /*#__PURE__*/_interopDefaultLegacy(fg);
var del__default = /*#__PURE__*/_interopDefaultLegacy(del);
var archiver__default = /*#__PURE__*/_interopDefaultLegacy(archiver);

var optionsSchema = {
  title: 'FileManagerPluginOptions',
  type: 'object',
  additionalProperties: false,
  definitions: {
    Copy: {
      description: 'Copy individual files or entire directories from a source folder to a destination folder',
      type: 'array',
      minItems: 1,
      additionalItems: true,
      itmes: [
        {
          type: 'object',
          additionalProperties: false,
          properties: {
            source: {
              description: 'Copy source. A file or directory or a glob',
              type: 'string',
              minLength: 1,
            },
            destination: {
              description: 'Copy destination',
              type: 'string',
              minLength: 1,
            },
            options: {
              additionalProperties: false,
              type: 'object',
              description: 'Options to forward to archiver',
              properties: {
                flat: {
                  description: 'Flatten the directory structure. All copied files will be put in the same directory',
                  type: 'boolean',
                  default: false,
                },
                overwrite: {
                  description: 'overwrite existing file or directory',
                  type: 'boolean',
                  default: true,
                },
                preserveTimestamps: {
                  description: 'Set last modification and access times to the ones of the original source files',
                  type: 'boolean',
                  default: false,
                },
              },
            },
            globOptions: {
              additionalProperties: true,
              type: 'object',
              description: 'Options to forward to fast-glob',
            },
          },
        },
      ],
    },
    Delete: {
      description: 'Delete individual files or entire directories',
      type: 'array',
      minItems: 1,
      additionalItems: true,
      items: {
        anyOf: [
          {
            type: 'object',
            additionalProperties: false,
            properties: {
              source: {
                type: 'string',
                minLength: 1,
              },
              options: {
                additionalProperties: true,
                type: 'object',
                description: 'Options to forward to del',
              },
            },
          },
          {
            type: 'string',
            minLength: 1,
          },
        ],
      },
    },
    Move: {
      description: 'Move individual files or entire directories from a source folder to a destination folder',
      type: 'array',
      additionalItems: true,
      items: [
        {
          type: 'object',
          additionalProperties: false,
          properties: {
            source: {
              description: 'Move source. A file or directory or a glob',
              type: 'string',
              minLength: 1,
            },
            destination: {
              description: 'Move destination',
              type: 'string',
              minLength: 1,
            },
          },
        },
      ],
    },
    Mkdir: {
      description: 'Create Directories',
      type: 'array',
      minItems: 1,
      additionalItems: true,
      items: {
        type: 'string',
      },
    },
    Archive: {
      description: 'Archive individual files or entire directories.',
      type: 'array',
      additionalItems: true,
      items: [
        {
          type: 'object',
          additionalProperties: false,
          properties: {
            source: {
              description: 'Source. A file or directory or a glob',
              type: 'string',
              minLength: 1,
            },
            destination: {
              description: 'Archive destination',
              type: 'string',
              minLength: 1,
            },
            format: {
              type: 'string',
              enum: ['zip', 'tar'],
            },
            options: {
              additionalProperties: true,
              type: 'object',
              description: 'Options to forward to archiver',
            },
            callback: {
              additionalProperties: true,
              instanceof: 'Function',
              description: 'Options to forward to archiver',
            }
          },
        },
      ],
    },
    Actions: {
      type: 'object',
      additionalProperties: false,
      properties: {
        copy: {
          $ref: '#/definitions/Copy',
        },
        delete: {
          $ref: '#/definitions/Delete',
        },
        move: {
          $ref: '#/definitions/Move',
        },
        mkdir: {
          $ref: '#/definitions/Mkdir',
        },
        archive: {
          $ref: '#/definitions/Archive',
        },
      },
    },
  },
  properties: {
    events: {
      type: 'object',
      additionalProperties: false,
      properties: {
        onStart: {
          oneOf: [
            {
              $ref: '#/definitions/Actions',
            },
            {
              type: 'array',
              items: {
                $ref: '#/definitions/Actions',
              },
            },
          ],
        },
        onEnd: {
          oneOf: [
            {
              $ref: '#/definitions/Actions',
            },
            {
              type: 'array',
              items: {
                $ref: '#/definitions/Actions',
              },
            },
          ],
        },
      },
    },
    runTasksInSeries: {
      type: 'boolean',
      default: false,
      description: 'Run tasks in an action in series',
    },
    context: {
      type: 'string',
      description: 'The directory, an absolute path, for resolving files. Defaults to webpack context',
    },
    runOnceInWatchMode: {
      type: 'boolean',
      default: false,
      description: 'Run tasks only at first compilation in watch mode',
    },
  },
};

const defaultTask = async () => {};

const pExec = async (series = false, arr = [], task = defaultTask) => {
  if (series) {
    await arr.reduce(async (p, spec) => {
      await p;
      return task(spec);
    }, Promise.resolve(null));
    return;
  }

  const pMap = arr.map(async (spec) => await task(spec));
  await Promise.all(pMap);
};

const defaultOptions$1 = {
  flat: false,
  cwd: process.cwd(),
};

const destPath = (pattern, file, options = defaultOptions$1) => {
  if (options.flat) {
    return path__default["default"].posix.basename(file);
  }

  const pathArr = pattern.split('/');
  const globIndex = pathArr.findIndex((item) => (item ? fg__default["default"].isDynamicPattern(item) : false));
  const normalized = pathArr.slice(0, globIndex).join('/');

  const absolutePath = path__default["default"].isAbsolute(normalized) ? normalized : path__default["default"].posix.join(options.cwd, normalized);

  return path__default["default"].relative(absolutePath, file);
};

const globCopy = async (pattern, destination, options = defaultOptions$1, globOptions = {}) => {
  await fsExtra__default["default"].ensureDir(destination);

  const matches = await fg__default["default"](pattern, { dot: true, ...globOptions, absolute: true, cwd: options.cwd });

  const entries = matches.map((file) => {
    const destDir = path__default["default"].isAbsolute(destination) ? destination : path__default["default"].posix.join(options.cwd, destination);
    const destFileName = destPath(pattern, file, options);

    return {
      from: file,
      destDir,
      destFileName,
      to: path__default["default"].posix.join(destDir, destFileName),
    };
  });

  const cpPromises = entries.map(async (entry) => {
    const copyOptions = {
      overwrite: true,
      preserveTimestamps: true,
    };

    return fsExtra__default["default"].copy(entry.from, entry.to, copyOptions);
  });

  return Promise.all(cpPromises);
};

const fsExtraDefaultOptions = {
  preserveTimestamps: true,
};

const copy = async (task, { logger }) => {
  const {
    source,
    absoluteSource,
    destination,
    absoluteDestination,
    context,
    toType,
    options = {},
    globOptions = {},
  } = task;

  logger.log(`copying from ${source} to ${destination}`);

  if (isGlob__default["default"](source)) {
    const cpOptions = {
      ...options,
      cwd: context,
    };

    await globCopy(source, absoluteDestination, cpOptions, globOptions);
  } else {
    const isSourceFile = fs__default["default"].lstatSync(absoluteSource).isFile();

    // if source is a file and target is a directory
    // create the directory and copy the file into that directory
    if (isSourceFile && toType === 'dir') {
      await fsExtra__default["default"].ensureDir(absoluteDestination);

      const sourceFileName = path__default["default"].posix.basename(absoluteSource);
      const filePath = path__default["default"].resolve(absoluteDestination, sourceFileName);

      await fsExtra__default["default"].copy(absoluteSource, filePath, fsExtraDefaultOptions);
      return;
    }

    await fsExtra__default["default"].copy(absoluteSource, absoluteDestination, fsExtraDefaultOptions);
  }

  logger.info(`copied "${source}" to "${destination}`);
};

const copyAction = async (tasks, options) => {
  const { runTasksInSeries, logger } = options;

  const taskOptions = {
    logger,
  };

  logger.debug(`processing copy tasks. tasks: ${tasks}`);

  await pExec(runTasksInSeries, tasks, async (task) => {
    try {
      await copy(task, taskOptions);
    } catch (err) {
      logger.error(`error while copying. task ${err}`);
    }
  });
  logger.debug(`copy tasks complete. tasks: ${tasks}`);
};

const moveAction = async (tasks, options) => {
  const { runTasksInSeries, logger } = options;

  logger.debug(`processing move tasks. tasks: ${tasks}`);

  await pExec(runTasksInSeries, tasks, async (task) => {
    try {
      await fsExtra__default["default"].move(task.absoluteSource, task.absoluteDestination);
      logger.info(`moved ${task.source} to ${task.destination}`);
    } catch (err) {
      logger.error(`unable to move ${task.source}, ${err}`);
    }
  });

  logger.debug(`move tasks complete. tasks: ${tasks}`);
};

const deleteAction = async (tasks, taskOptions) => {
  const { runTasksInSeries, logger } = taskOptions;

  logger.debug(`processing delete tasks. tasks: ${tasks}`);

  await pExec(runTasksInSeries, tasks, async (task) => {
    const { options = {} } = task;

    try {
      await del__default["default"](task.absoluteSource, options);
      logger.info(`deleted ${task.source}`);
    } catch (err) {
      logger.error(`unable to delete ${task.source}. ${err}`);
    }
  });

  logger.debug(`delete tasks complete. tasks: ${tasks}`);
};

const mkdirAction = async (tasks, options) => {
  const { runTasksInSeries, logger } = options;

  logger.debug(`processing mkdir tasks. tasks: ${tasks}`);

  await pExec(runTasksInSeries, tasks, async (task) => {
    try {
      await fs__default["default"].promises.mkdir(task.absoluteSource, { recursive: true });
      logger.info(`created directory. ${task.source}`);
    } catch (err) {
      logger.error(`unable to create direcotry: ${task.source}. ${err}`);
    }
  });

  logger.debug(`mkdir tasks complete. tasks: ${tasks}`);
};

const archive = async (task, { logger }) => {
  const { source, absoluteSource, absoluteDestination, options = {}, context, callback } = task;
  const format = task.format || path__default["default"].extname(absoluteDestination).replace('.', '');

  // Exclude destination file from archive
  const destFile = path__default["default"].basename(absoluteDestination);
  const destDir = path__default["default"].dirname(absoluteDestination);

  const inputGlobOptions = options.globOptions || {};

  const ignore = Array.isArray(inputGlobOptions.ignore) ? [...inputGlobOptions.ignore, destFile] : [destFile];
  const fileToIgnore = typeof inputGlobOptions.ignore === 'string' ? [...ignore, inputGlobOptions.ignore] : ignore;
  const globOptions = { ...inputGlobOptions, ignore: fileToIgnore };

  await fsExtra__default["default"].ensureDir(destDir);

  const output = fs__default["default"].createWriteStream(absoluteDestination);
  const archive = archiver__default["default"](format, options);

  const streamClose = () => new Promise((resolve) => output.on('close', resolve));

  archive.pipe(output);

  logger.log(`archiving src ${source}`);

  if (isGlob__default["default"](source)) {
    const opts = {
      ...globOptions,
      cwd: context,
    };

    await archive.glob(source, opts).finalize();
  } else {
    const sStat = fs__default["default"].lstatSync(absoluteSource);

    if (sStat.isDirectory()) {
      const opts = {
        ...globOptions,
        cwd: absoluteSource,
      };

      await archive.glob('**/*', opts).finalize();
    }

    if (sStat.isFile()) {
      const opts = {
        name: path__default["default"].basename(source),
      };

      await archive.file(absoluteSource, opts).finalize();
    }
  }

  await streamClose();

  callback();

  logger.info(`archive exec callback`);

  logger.info(`archive created at "${absoluteDestination}"`);
};

const archiveAction = async (tasks, options) => {
  const { runTasksInSeries, logger } = options;

  const taskOptions = {
    logger,
  };

  logger.debug(`processing archive tasks. tasks: ${tasks}`);
  await pExec(runTasksInSeries, tasks, async (task) => {
    try {
      await archive(task, taskOptions);
    } catch (err) {
      logger.error(`error while creating archive. task ${task}`);
    }
  });
  logger.debug(`archive tasks complete. tasks: ${tasks}`);
};

const PLUGIN_NAME = 'FileManagerPlugin';

const defaultOptions = {
  events: {
    onStart: [],
    onEnd: [],
  },
  runTasksInSeries: false,
  context: null,
  runOnceInWatchMode: false,
};

const resolvePaths = (action, context) => {
  return action.map((task) => {
    if (typeof task === 'string') {
      const source = task;
      return {
        source,
        absoluteSource: path__default["default"].isAbsolute(source) ? source : path__default["default"].join(context, source),
      };
    }

    const { source, destination } = task;

    if (!destination) {
      return {
        ...task,
        source,
        absoluteSource: path__default["default"].isAbsolute(source) ? source : path__default["default"].join(context, source),
      };
    }

    const toType = /(?:\\|\/)$/.test(destination) ? 'dir' : 'file';

    const absoluteSource = path__default["default"].isAbsolute(source) ? source : path__default["default"].join(context, source);
    const absoluteDestination = path__default["default"].isAbsolute(destination) ? destination : path__default["default"].join(context, destination);

    return {
      ...task,
      source: normalizePath__default["default"](source),
      absoluteSource: normalizePath__default["default"](absoluteSource),
      destination: normalizePath__default["default"](destination),
      absoluteDestination: normalizePath__default["default"](absoluteDestination),
      toType,
      context,
    };
  });
};

class FileManagerPlugin {
  constructor(options) {
    schemaUtils.validate(optionsSchema, options, {
      name: PLUGIN_NAME,
      baseDataPath: 'actions',
    });

    this.options = { ...defaultOptions, ...options };
  }

  async applyAction(action, actionParams) {
    const opts = {
      runTasksInSeries: this.options.runTasksInSeries,
      logger: this.logger,
    };

    await action(resolvePaths(actionParams, this.context), opts);
  }

  async run(event) {
    for (const actionType in event) {
      const action = event[actionType];

      switch (actionType) {
        case 'delete':
          await this.applyAction(deleteAction, action);
          break;

        case 'mkdir':
          await this.applyAction(mkdirAction, action);
          break;

        case 'copy':
          await this.applyAction(copyAction, action);
          break;

        case 'move':
          await this.applyAction(moveAction, action);
          break;

        case 'archive':
          await this.applyAction(archiveAction, action);
          break;

        default:
          throw Error('Unknown action');
      }
    }
  }

  async execute(eventName) {
    const { events } = this.options;

    if (Array.isArray(events[eventName])) {
      const eventsArr = events[eventName];

      await pExec(true, eventsArr, async (event) => await this.run(event));
      return;
    }

    const event = events[eventName];
    await this.run(event);
  }

  apply(compiler) {
    this.context = this.options.context || compiler.options.context;
    this.logger = compiler.getInfrastructureLogger(PLUGIN_NAME);

    const onStart = async () => {
      await this.execute('onStart');
    };

    const onEnd = async () => {
      await this.execute('onEnd');
    };

    compiler.hooks.beforeRun.tapPromise(PLUGIN_NAME, onStart);
    compiler.hooks.afterEmit.tapPromise(PLUGIN_NAME, onEnd);

    let watchRunCount = 0;
    compiler.hooks.watchRun.tapPromise(PLUGIN_NAME, async () => {
      if (this.options.runOnceInWatchMode && watchRunCount > 0) {
        return;
      }

      ++watchRunCount;
      await onStart();
    });
  }
}

module.exports = FileManagerPlugin;
//# sourceMappingURL=index.cjs.map
