import Express from "express";
import { isAdmin, requiresignIn } from "../middleware/authmiddleware.js";
import {
    categoryControlller,
    createCategoryController,
    deleteCategoryCOntroller,
    singleCategoryController,
    updateCategoryController
} from "../Controller/Categorycontroller.js";

const router = Express.Router();


//create category
router.post("/create-category",requiresignIn,isAdmin,createCategoryController);


//update category
router.put(
  "/update-category/:id",
  requiresignIn,
  isAdmin,
  updateCategoryController
);

//getALl category
router.get("/get-category", categoryControlller);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  requiresignIn,
  isAdmin,
  deleteCategoryCOntroller
);


export default router;