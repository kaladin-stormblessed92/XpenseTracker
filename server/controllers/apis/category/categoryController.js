const express = require("express");
const router = express.Router();
const categoryService = require("../../../services/categories/categoryService");
router.get("/getAll/:type", categoryService.getAllCategory);
