const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const { parse } = require("querystring");
const mimeTypes = require("mime-types");

// Server configuration
const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, "public");
const UPLOADS_DIR = path.join(__dirname, "uploads");

// Ensure required directories exist
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Utility functions
const logger = (req, res, startTime) => {
  const ms = Date.now() - startTime;
  const { method, url } = req;
  const { statusCode } = res;
  console.log(
    `${new Date().toISOString()} - ${method} ${url} ${statusCode} ${ms}ms`
  );
};

const parseBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        const contentType = req.headers["content-type"] || "";

        if (contentType.includes("application/json")) {
          resolve(JSON.parse(body));
        } else if (contentType.includes("application/x-www-form-urlencoded")) {
          resolve(parse(body));
        } else {
          resolve(body);
        }
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
};

const sendResponse = (
  res,
  statusCode,
  data,
  contentType = "application/json"
) => {
  res.writeHead(statusCode, { "Content-Type": contentType });
  if (contentType === "application/json") {
    res.end(JSON.stringify(data));
  } else {
    res.end(data);
  }
};

const serveStaticFile = (res, filePath) => {
  const mimeType = mimeTypes.lookup(filePath) || "application/octet-stream";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        sendResponse(res, 404, { error: "File not found" });
      } else {
        sendResponse(res, 500, { error: "Internal server error" });
      }
    } else {
      res.writeHead(200, { "Content-Type": mimeType });
      res.end(data);
    }
  });
};

const handleApiRequest = async (req, res, pathname, query) => {
  const method = req.method;

  try {
    switch (pathname) {
      case "/api/users":
        if (method === "GET") {
          // Get all users
          sendResponse(res, 200, {
            users: [
              { id: 1, name: "John Doe", email: "john@example.com" },
              { id: 2, name: "Jane Smith", email: "jane@example.com" },
            ],
          });
        } else if (method === "POST") {
          // Create a new user
          const body = await parseBody(req);
          sendResponse(res, 201, {
            message: "User created",
            user: { ...body },
          });
        }
        break;

      case "/api/users/1":
        if (method === "GET") {
          // Get user with ID 1
          sendResponse(res, 200, {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
          });
        } else if (method === "PUT") {
          // Update user with ID 1
          const body = await parseBody(req);
          sendResponse(res, 200, {
            message: "User updated",
            user: { id: 1, ...body },
          });
        } else if (method === "DELETE") {
          // Delete user with ID 1
          sendResponse(res, 200, {
            message: "User deleted",
          });
        }
        break;

      case "/api/upload":
        if (method === "POST") {
          handleFileUpload(req, res);
        }
        break;

      default:
        sendResponse(res, 404, { error: "API endpoint not found" });
    }
  } catch (error) {
    console.log("Error processing request:", error);
    sendResponse(res, 500, { error: "Internal server error" });
  }
};

const handleFileUpload = (req, res) => {
  const boundary = req.headers["content-type"].split("; ")[1].split("=")[1];
  let body = Buffer.alloc(0);

  req.on("data", (chunk) => {
    body = Buffer.concat([body, chunk]);
  });

  req.on("end", () => {
    // In a real application, you would properly parse the multipart data here
    // For this example, we'll just acknowledge the upload
    const filename = `upload_${Date.now()}.dat`;
    const filePath = path.join(UPLOADS_DIR, filename);

    fs.writeFile(filePath, body, (err) => {
      if (err) {
        sendResponse(res, 500, { error: "Failed to save file" });
      } else {
        sendResponse(res, 200, {
          message: "File uploaded successfully",
          filename: filename,
          path: filePath,
        });
      }
    });
  });
};

// Main request handler
const requestHandler = async (req, res) => {
  const startTime = Date.now();
  const parsedUrl = url.parse(req.url, true);
  const { pathname, query } = parsedUrl;
  const method = req.method;

  console.log(`Processing ${method} request for ${pathname}`);

  try {
    // Handle API requests
    if (pathname.startsWith("/api/")) {
      await handleApiRequest(req, res, pathname, query);
    }
    // Serve static files
    else if (method === "GET") {
      // If requesting root, serve index.html
      let filePath = pathname === "/" ? "/index.html" : pathname;
      filePath = path.join(PUBLIC_DIR, filePath);

      serveStaticFile(res, filePath);
    }
    // Handle 404 for other routes
    else {
      sendResponse(res, 404, { error: "Route not found" });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    sendResponse(res, 500, { error: "Internal server error" });
  } finally {
    logger(req, res, startTime);
  }
};

// Create and start the server
const server = http.createServer(requestHandler);

server.listen(PORT, () => {
  console.log(`Server running at http://locahost:${PORT}/`);
  console.log(`Server running at http://172.19.15.102:${PORT}/`);
  console.log("Available endpoints:");
  console.log("  GET  /                     - Static file serving");
  console.log("  GET  /api/users            - Get all users");
  console.log("  POST /api/users            - Create a new user");
  console.log("  GET  /api/users/1          - Get user with ID 1");
  console.log("  PUT  /api/users/1          - Update user with ID 1");
  console.log("  DELETE /api/users/1        - Delete user with ID 1");
  console.log("  POST /api/upload           - Upload a file");
});

// Handle server errors
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.log(`Port ${PORT} is already in use.`);
  } else {
    console.error("Server error:", err);
  }
});

module.exports = server;
