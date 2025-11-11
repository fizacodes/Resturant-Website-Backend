// import Menu from "../models/Menu.js";
// import cloudinary from "../config/cloudinary.js";

// // CREATE MENU ITEM
// export const createMenuItem = async (req, res) => {
//   try {
//     const { name, description, price, category } = req.body;

//     // Debug logging
//     console.log('Request body:', req.body);
//     console.log('Request file:', req.file);

//     if (!req.file) {
//       return res.status(400).json({ message: "Image is required" });
//     }

//     // Validate required fields
//     if (!name || !description || !price || !category) {
//       return res.status(400).json({ 
//         message: "Missing required fields",
//         required: { name, description, price, category }
//       });
//     }

//     // Upload using buffer (memoryStorage)
//     const uploaded = await new Promise((resolve, reject) => {
//       console.log('Starting Cloudinary upload...');
//       const stream = cloudinary.uploader.upload_stream(
//         { folder: "menu-items" },
//         (error, result) => {
//           if (error) {
//             console.error('Cloudinary upload error:', error);
//             reject(error);
//           } else {
//             console.log('Cloudinary upload successful');
//             resolve(result);
//           }
//         }
//       );
//       stream.end(req.file.buffer);
//     });

//     const newItem = new Menu({
//       name,
//       description,
//       price,
//       category,
//       imageUrl: uploaded.secure_url, // store Cloudinary URL
//     });

//     await newItem.save();
//     res.status(201).json({ message: "Menu item created", item: newItem });
//   } catch (error) {
//     console.error('Error creating menu item:', error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // GET ALL MENU ITEMS
// export const getMenuItems = async (req, res) => {
//   try {
//     const items = await Menu.find();
//     res.status(200).json(items);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // UPDATE MENU ITEM
// export const updateMenuItem = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updated = await Menu.findByIdAndUpdate(id, req.body, { new: true });

//     if (!updated) return res.status(404).json({ message: "Item not found" });

//     res.status(200).json({ message: "Item updated", item: updated });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // DELETE MENU ITEM
// export const deleteMenuItem = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Menu.findByIdAndDelete(id);
//     res.status(200).json({ message: "Item deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };
import Menu from "../models/Menu.js";
import cloudinary from "../config/cloudinary.js";

// CREATE MENU ITEM
export const createMenuItem = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category || !req.file) {
      return res.status(400).json({
        message: "Missing required fields or image",
        required: { name, description, price, category, image: !!req.file },
      });
    }

    // Upload image to Cloudinary
    const uploaded = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "menu-items" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    const newItem = new Menu({
      name,
      description,
      price,
      category,          // store ObjectId of Category
      imageUrl: uploaded.secure_url,
    });

    await newItem.save();
    res.status(201).json({ message: "Menu item created", item: newItem });
  } catch (error) {
    console.error("Error creating menu item:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET ALL MENU ITEMS
export const getMenuItems = async (req, res) => {
  try {
    // Populate category name
    const items = await Menu.find().populate("category", "name");
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE MENU ITEM
export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // If there is a new image, upload it to Cloudinary
    if (req.file) {
      const uploaded = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "menu-items" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      updateData.imageUrl = uploaded.secure_url;
    }

    const updated = await Menu.findByIdAndUpdate(id, updateData, { new: true });

    if (!updated) return res.status(404).json({ message: "Item not found" });

    res.status(200).json({ message: "Menu item updated", item: updated });
  } catch (error) {
    console.error("Error updating menu item:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE MENU ITEM
export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Menu.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Item not found" });

    res.status(200).json({ message: "Menu item deleted" });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).json({ message: "Server error" });
  }
};
