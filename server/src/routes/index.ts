import { Router, type Application } from "express";
import userRoutes from "./userRoutes.js";

interface RouterConf {
  path: string;
  router: Router;
}

const routerConf: RouterConf[] = [{ path: "/api/users", router: userRoutes }];

export const routes = (app: Application) => {
  app.get("/", (_req, res) => {
    res.status(200).json({
      success: true,
      message: "Server is running",
    });
  });

  routerConf.forEach((conf) => {
    app.use(conf.path, conf.router);
  });
};

export default routes;
