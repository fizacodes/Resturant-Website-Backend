import Category from "../models/category.js";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const exist = await Category.findOne({ name });
    if (exist) return res.status(400).json({ message: "Category already exists" });

    const newCat = new Category({ name });
    await newCat.save();

    res.status(201).json({ message: "Category created", category: newCat });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const getCategories = async (req, res) => {
  try {
    const cat = await Category.find();
    res.status(200).json(cat);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
