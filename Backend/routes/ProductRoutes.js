import Express from "express";
import { isAdmin, requiresignIn } from "../middleware/authmiddleware.js";
import {

    createProductController,
    deleteProductController,
    getProductController,
    getSingleProductController,
  paymenttokencontroller,

    productCategoryController,
    productCountController,
    productFiltersController,
    productListController,
    productPhotoController,
    realtedProductController,
    searchProductController,
    updateProductController,
    brainTreePaymentController
} from "../Controller/ProductController.js";
import ExpressFormidable from "express-formidable";

const router = Express.Router();

//create product

router.post('/create-product',
    requiresignIn, isAdmin,
    ExpressFormidable(),
    createProductController);

    //Update product
router.put(
  "/update-product/:pid",
  requiresignIn,
  isAdmin,
  ExpressFormidable(),
  updateProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
// router.get("/product-category/:slug", productCategoryController);

//category wise product
router.get("/product-category/:slug", productCategoryController);


//payments
//token
router.get("/braintree/token", paymenttokencontroller);

//payments
router.post("/braintree/payment", requiresignIn, brainTreePaymentController);


export default router;