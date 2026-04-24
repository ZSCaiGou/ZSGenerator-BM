import koa from "koa";

const app = new koa();

app.use((ctx) => {
  ctx.body = "hello world";
});

app.listen(3000, () => {
  console.log("server is running at port 3000");
});
