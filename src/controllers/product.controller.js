import { ProductModel } from "../models/product.model.js";

const getAllProducts = async (req, res) => {
  const products = await ProductModel.findAll();
  res.status(200).json({
    success: true,
    message: "Lista de productos",
    data: products,
    errors: [],
  });
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(Number(id));
    // Validamos si el producto existe
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Producto con ID ${id} no encontrado`,
        data: [],
        errors: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Producto encontrado correctamente",
      data: product,
      errors: [],
    });
  } catch (error) { 
    res.status(500).json({
      success: false,
      message: "Error al procesar la búsqueda",
      data: [],
      errors: [],
    });
  }
};

const createProduct = async (req, res) => {
  const { name, price, categoryId } = req.body;
  // Validación simple
  if (!name || !price || !categoryId) {
    return res.status(400).json({
      success: false,
      message: "Nombre y precio son obligatorios",
      data: [],
      errors: [],
    });
  }

  const newProduct = await ProductModel.create({ name, price, categoryId });
  res.status(201).json({
    success: true,
    message: "Producto creado correctamente",
    data: newProduct,
    errors: [],
  });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updatedProduct = await ProductModel.update(Number(id), req.body);
  if (!updatedProduct) { 
    return res.status(404).json({
      success: false,
      message: `Producto con ID ${id} no encontrado`,
      data: [],
      errors: [],
    });
  }
  res.status(200).json({
    success: true,
    message: "Producto actualizado correctamente",
    data: updatedProduct,
    errors: [],
  });
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const isDeleted = await ProductModel.delete(Number(id));
    if (!isDeleted) {
      return res.status(404).json({
        success: false,
        message: `No se pudo eliminar: Producto con ID ${id} no encontrado`,
        data: [],
        errors: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Producto eliminado correctamente",
      data: [],
      errors: [],
    });    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error al intentar eliminar el producto`,
      data: [],
      errors: [],
    });
  } 
}

export { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
