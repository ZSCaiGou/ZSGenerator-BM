import { Router, Express } from "express";

interface RouterConf {
  path: string;
  router: Router;
  meta?: Record<string, any>;
}

const routerConf: RouterConf[] = [];

export const routes = (app: Express) => {
  app.get("/", (req, res) => {
    res.status(200).send("Hello, TypeScript and Express!");
  });
  routerConf.forEach((conf) => {
    app.use(conf.path, conf.router);
  });
};

export default routes;
