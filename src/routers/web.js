const express = require("express");
const router = express.Router();
const passport = require("passport");
const TestController = require("../apps/controllers/TestController");
const AuthController = require("../apps/controllers/auth");
const AdminController = require("../apps/controllers/admin");
const ProductController = require("../apps/controllers/product");
const CommentController = require("../apps/controllers/comment");
const UserController = require("../apps/controllers/user");
const CategoryController = require("../apps/controllers/category");
const AdvertisementController = require("../apps/controllers/ad");
const ConfigController = require("../apps/controllers/config");
const TestMiddleware = require("../apps/middlewares/test");
const AuthMiddleware = require("../apps/middlewares/auth");
const UploadMiddleware = require("../apps/middlewares/upload");
const multer = require("multer");

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

router.get("/admin/users", UserController.index);
router.get("/admin/users/create", UserController.create);
router.post("/admin/users/store", UserController.store);
router.get("/admin/users/edit/:id", UserController.edit);
router.post("/admin/users/update/:id", UserController.update);
router.get("/admin/users/delete/:id", UserController.del);

//category

router.get("/admin/categories", CategoryController.index);
router.get("/admin/categories/create", CategoryController.create);
router.post("/admin/categories/store", CategoryController.store);
router.get("/admin/categories/edit/:id", CategoryController.edit);
router.post("/admin/categories/update/:id", CategoryController.update);
router.get("/admin/categories/delete/:id", CategoryController.del);


//gg
// Bắt đầu đăng nhập Google
router.get("/auth/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));

// Xử lý callback sau khi Google xác thực
router.get("/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/admin/login"
  }),
  (req, res) => {
    // Thành công → chuyển về dashboard
    req.session.email = req.user.email;
    res.redirect("/admin/dashboard");
  }
);

router.get("/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

// Callback khi Facebook trả về
router.get("/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/admin/login" }),
  (req, res) => {
    req.session.email = req.user.email;
    res.redirect("/admin/dashboard");
  }
);



//comment
router.get("/admin/comments", CommentController.index);
router.post("/admin/comments/create", CommentController.create);
router.get("/admin/comments/delete/:id", CommentController.del);

//advertisement
router.get("/admin/advertisements", AdvertisementController.index);
router.get("/admin/advertisements/create", AdvertisementController.create);
router.post(
  "/admin/advertisements/store",
  UploadMiddleware.single("image"), 
  AdvertisementController.store
);
router.get("/admin/advertisements/edit/:id", AdvertisementController.edit);
router.post(
  "/admin/advertisements/update/:id",
  UploadMiddleware.single("image"), 
  AdvertisementController.update
);
router.get("/admin/advertisements/delete/:id", AdvertisementController.del);
router.post("/advertisements/:id/click", AdvertisementController.recordClick);



// config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/public/upload/');
  },
  filename: function (req, file, cb) {
    // Tạo tên file tránh trùng lặp, ví dụ: logo-123456789.png
    const ext = file.originalname.split('.').pop();
    cb(null, 'logo-' + Date.now() + '.' + ext);
  }
});
const upload = multer({ storage: storage });

router.get('/admin/config', ConfigController.getConfig);
router.get('/admin/config/edit', ConfigController.edit);
router.post('/admin/config', upload.single('logo'), ConfigController.postConfig);






module.exports = router;
