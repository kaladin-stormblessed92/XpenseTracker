const { Category, validate } = require("../../models/category");
const getCategoriesbyType = async (categoryType, userId, next) => {
  try {
    const res = await Category.find({ type: categoryType });
  } catch (err) {
    next(err);
  }
  return res;
};

const saveCategory = async (category, next) => {
  try {
    const res = await new Category(category).save();
  } catch (err) {
    next(err);
  }

  return res;
};

module.exports = {
  getCategoriesbyType: getCategoriesbyType,
  saveCategory: saveCategory
};
