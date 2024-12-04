import express, { Request, Response } from "express";
import { envs } from './config/envs';
import { dbConnection } from "./db/init";
import { User } from "./db/models/user.models";
import { Product } from "./db/models/product.models";
import { Category } from "./db/models/category.models";
import path from 'path';


const app = express();

app.use(express.json());
dbConnection(); 


////////////////////////////////////////////////////
// ON TO USER
// REST FRO USER
//
// GET /allFromUser 
app.get("/allFromUser", async (req: Request, res: Response): Promise<any> => {
    try {
      const allFromUser = await User.findAll(); // Fetch all tasks from the database
      return res.json(allFromUser);
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving tasks" });
    }
  });

// GET /UserUsingId/:id
app.get("/UserUsingId/:id", async (req: Request, res: Response): Promise<any> => {
    const UserId = parseInt(req.params.id);
    try {
      const UserUsingId = await User.findByPk(UserId); // Find a task by its primary key (ID)
      if (UserUsingId) {
        return res.json(UserUsingId);
      } else {
        return res.status(404).json({ message: "Task not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving task" });
    }
  });

// POST /User
app.post("/User", async (req: Request, res: Response): Promise<any> => {
    const { name, email, password } = req.body;

    // Create a new USER
    const newUser = {
        name,
        email,
        password
    };
    const dbUser = await User.create(newUser); // Save to database
    return res.status(201).json(dbUser);
});

// PUT /UserUsingId/:id EDIT A user
app.put("/UserUsingId/:id", async (req: Request, res: Response): Promise<any> => {
    const userId = parseInt(req.params.id);
    const { name, email, password } = req.body;
  
    try {
      const edit_User = await User.findByPk(userId);
  
      if (edit_User) {
        // Update the task fields
        edit_User.name = name || edit_User.name;
        edit_User.email = email || edit_User.email;
        edit_User.password = password || edit_User.password;
  
        await edit_User.save(); // Save the updated task to the database
        return res.json(edit_User);
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error updating User" });
    }
  });

  // DELETE /UserUsingId/:id - Deletes a user
  app.delete("/UserUsingId/:id", async (req: Request, res: Response): Promise<any> => {
    const userId = parseInt(req.params.id);
  
    try {
      const result = await User.destroy({
        where: { id: userId }
      });
  
      if (result) {
        return res.json({ message: "User deleted successfully" });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error deleting User" });
    }
  });

////////////////////////////////////////////////////////////////
// ON TO PRODUCT
// REST FRO PRODUCTS
//
// GET /allFromProduct
app.get("/allFromProduct", async (req: Request, res: Response): Promise<any> => {
    try {
      const allFromProduct = await Product.findAll();
      return res.json(allFromProduct);
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving products" });
    }
  });
  
  // GET /ProductUsingId/:id
  app.get("/ProductUsingId/:id", async (req: Request, res: Response): Promise<any> => {
    const productId = parseInt(req.params.id);
    try {
      const productUsingId = await Product.findByPk(productId);
      if (productUsingId) {
        return res.json(productUsingId);
      } else {
        return res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving product" });
    }
  });
  
  // POST /Product
  app.post("/Product", async (req: Request, res: Response): Promise<any> => {
    const { product_name, category, price, available } = req.body;
  
    try {
      const newProduct = { product_name, category, price, available };
      const dbProduct = await Product.create(newProduct);
      return res.status(201).json(dbProduct);
    } catch (error) {
        console.error(error)
      return res.status(500).json({ message: "Error creating product" });
    }
  });
  
  // PUT /ProductUsingId/:id
  app.put("/ProductUsingId/:id", async (req: Request, res: Response): Promise<any> => {
    const productId = parseInt(req.params.id);
    const { product_name, category, price, available } = req.body;
  
    try {
      const editProduct = await Product.findByPk(productId);
  
      if (editProduct) {
        editProduct.product_name = product_name || editProduct.product_name;
        editProduct.category = category || editProduct.category;
        editProduct.price = price || editProduct.price;
        editProduct.available = available || editProduct.available;
  
        await editProduct.save();
        return res.json(editProduct);
      } else {
        return res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error updating product" });
    }
  });
  
  // DELETE /ProductUsingId/:id
  app.delete("/ProductUsingId/:id", async (req: Request, res: Response): Promise<any> => {
    const productId = parseInt(req.params.id);
  
    try {
      const result = await Product.destroy({ where: { id: productId } });
  
      if (result) {
        return res.json({ message: "Product deleted successfully" });
      } else {
        return res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error deleting product" });
    }
  });

////////////////////////////////////////////////////////////////
/// ON TO CATEGORY 
// REST FRO CATEGORY
//
// GET /allFromCategory
app.get("/allFromCategory", async (req: Request, res: Response): Promise<any> => {
    try {
      const allFromCategory = await Category.findAll(); // Fetch all tasks from the database
      return res.json(allFromCategory);
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving Category" });
    }
  });

  // GET /CategoryUsingId/:id
app.get("/CategoryUsingId/:id", async (req: Request, res: Response): Promise<any> => {
    const categoryId = parseInt(req.params.id);
    try {
      const categoryUsingId = await Category.findByPk(categoryId); // Find a task by its primary key (ID)
      if (categoryUsingId) {
        return res.json(categoryUsingId);
      } else {
        return res.status(404).json({ message: "Task not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving task" });
    }
  });

  // POST /Category
app.post("/Category", async (req: Request, res: Response): Promise<any> => {
    const { category} = req.body;

    // Create a new USER
    const newCategory = {
        category
    };
    const dbCategory = await Category.create(newCategory); // Save to database
    return res.status(201).json(dbCategory);
});

  // PUT /CategoryUsingId/:id EDIT A user
app.put("/CategoryUsingId/:id", async (req: Request, res: Response): Promise<any> => {
    const categoryId = parseInt(req.params.id);
    const { category } = req.body;
  
    try {
      const edit_Category = await Category.findByPk(categoryId);
  
      if (edit_Category) {
        // Update the task fields
        edit_Category.category = category || edit_Category.category;
  
        await edit_Category.save(); // Save the updated task to the database
        return res.json(edit_Category);
      } else {
        return res.status(404).json({ message: "Category not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error updating Category" });
    }
  });

  // DELETE /CategoryUsingId/:id - Deletes a user
  app.delete("/CategoryUsingId/:id", async (req: Request, res: Response): Promise<any> => {
    const categorytId = parseInt(req.params.id);
  
    try {
      const result = await Category.destroy({
        where: { id: categorytId }
      });
  
      if (result) {
        return res.json({ message: "Category deleted successfully" });
      } else {
        return res.status(404).json({ message: "Category not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error deleting Category" });
    }
  });

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});