const Koa = require("koa");
const Router = require("koa-router");
const { koaBody } = require("koa-body");

const POST = 3000;
const app = new Koa();
const router = new Router({ prefix: "/api" });

let users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

app.use(koaBody());

app.use(async (ctx, next) => {
  await next();
  if (ctx.body) {
    ctx.body = {
      code: 200,
      data: ctx.body,
      message: "请求成功",
    };
  }
});

router.get("/users", async (ctx) => {
  ctx.body = users;
});

router.get("/users/:id", async (ctx) => {
  const user = users.find((u) => u.id === id);
  if (user) {
    ctx.body = user;
  } else {
    ctx.status = 404;
    ctx.body = { message: "用户不存在" };
  }
});

router.post("/users", async (ctx) => {
  const { name, email } = ctx.request.body;
  const newUser = {
    id: users.length + 1,
    name: name,
    email: email,
  };
  users.push(newUser);
  ctx.status = 201;
  ctx.body = newUser;
});

router.put("/users/:id", async (ctx) => {
  const { name, email } = ctx.request.body;
  const user = users.find((u) => u.id === parseInt(ctx.params.id));
  if (user) {
    user.name = name;
    user.email = email;
    ctx.body = user;
  } else {
    ctx.status = 404;
    ctx.body = { message: "用户不存在" };
  }
});

router.delete("/users/:id", async (ctx) => {
  const index = users.findIndex((u) => u.id === parseInt(ctx.params.id));
  if (index !== -1) {
    users.splice(index, 1);
    ctx.status = 204;
  } else {
    ctx.status = 404;
    ctx.body = { message: "用户不存在" };
  }
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(POST, () => {
  console.log(`Server listening at http://localhost:${POST}`);
  console.log(`Server listening at http://172.19.15.102:${POST}`);
  console.log(`  GET /users         - 获取用户列表`);
  console.log(`  GET /users/:id     - 获取单个用户`);
  console.log(`  POST /users        - 创建用户`);
  console.log(`  PUT /users/:id     - 更新用户`);
  console.log(`  DELETE /users/:id  - 删除用户`);
});
