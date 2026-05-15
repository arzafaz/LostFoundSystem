import express from "express";
import { create, fetchAll, fetchOne, update, deleteItem } from "../controller/itemController.js";

const route = express.Router();

route.post("/report", create);
route.get("/all", fetchAll);
route.get("/:id", fetchOne);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteItem);

export default route;