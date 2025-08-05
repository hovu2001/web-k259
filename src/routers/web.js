const express = require("express");
const router = express.Router();
const TestController = require("../apps/controllers/TestController");
const AuthController = require("../apps/controllers/auth");
const AdminController = require("../apps/controllers/admin");
const ProductController = require("../apps/controllers/product");
const TestMiddleware = require("../apps/middlewares/test");
const AuthMiddleware = require("../apps/middlewares/auth");
const UploadMiddleware = require("../apps/middlewares/upload");

router.get("/test1", TestController.test1);
router.get("/test2", TestMiddleware.test, TestController.test2);
// router.get("/form", TestController.Form);
// router.post("/form", TestController.Test);
router.get("/admin/login", AuthMiddleware.checkLogin, AuthController.getLogin);
router.post(
  "/admin/login",
  AuthMiddleware.checkLogin,
  AuthController.postLogin
);
router.get("/admin/logout", AuthMiddleware.checkAdmin, AuthController.logout);
router.get(
  "/admin/dashboard",
  AuthMiddleware.checkAdmin,
  AdminController.dashboard
);
router.get(
  "/admin/products",
  AuthMiddleware.checkAdmin,
  ProductController.index
);
router.get(
  "/admin/products/create",
  AuthMiddleware.checkAdmin,
  ProductController.create
);
router.post(
  "/admin/products/store",
  AuthMiddleware.checkAdmin,
  UploadMiddleware.single("thumbnail"),
  ProductController.store
);
router.get(
  "/admin/products/edit/:id",
  AuthMiddleware.checkAdmin,
  ProductController.edit
);
router.post(
  "/admin/products/update/:id",
  AuthMiddleware.checkAdmin,
  UploadMiddleware.single("thumbnail"),
  ProductController.update
);
router.get(
  "/admin/products/delete/:id",
  AuthMiddleware.checkAdmin,
  ProductController.del
);




//User

router.get("/admin/users", (req,res) =>{
  res.send("/admin/users");
});
router.get("/admin/users/create", (req,res) =>{
  res.send("/admin/users/create");
});
router.get("/admin/users/edit/:id", (req,res) =>{
  res.send("/admin/users/edit/:id");
});
router.get("/admin/users/delete/:id", (req,res) =>{
  res.send("/admin/users/delete/:id");
});

//category

router.get("/admin/categories", (req,res) =>{
  res.send("/admin/categories");
});
router.get("/admin/categories/create", (req,res) =>{
  res.send("/admin/categories/create");
});
router.get("/admin/categories/edit/:id", (req,res) =>{
  res.send("/admin/categories/edit/:id");
});
router.get("/admin/categories/delete/:id", (req,res) =>{
  res.send("/admin/categories/delete/:id");
});

  

module.exports = router;
