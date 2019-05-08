const express = require("express");
const router = express.Router();
const categoryService = require("../../../services/categories/categoryService");
router.get("/getCategories/:type", (req, res, next) => {
  const categoryType = req.params.type;
  const userId = req.user._id;
  const categories = categoryService.getCategoriesbyType(
    categoryType,
    userId,
    next
  );
  res.send(categories);
});
router.post("/save", (req, res, next) => {
  const category = req.body;
  const userId = req.user._id;
  category["createdBy"] = userId;
  const categories = categoryService.saveCategory(category, next);
  res.send(categories);
});
