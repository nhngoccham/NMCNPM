import express from "express";
import * as controllers from "./matchControllers";
const matchRoutes = new express.Router();

matchRoutes.get("/", controllers.get);
matchRoutes.put("/:id", controllers.update);
matchRoutes.post("/:id/detail", controllers.createDetail);
matchRoutes.post("/:id/highlight", controllers.createHighlight);
matchRoutes.post("/:id/isEnded", controllers.createEnd);
matchRoutes.post("/", controllers.create);

export default matchRoutes;
