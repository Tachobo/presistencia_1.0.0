// import productsData from "../data/products.data.js";

// export const ProductModel = {
//   findAll: () => {
//     return productsData;
//   },

//   findById: (id) => {
//     return productsData.find((p) => p.id === id);
//   },

//   // NUEVO MÉTODO: Búsqueda relacional
//   findByCategoryId: (categoryId) => {
//     // Usamos .filter() porque una categoría puede tener MUCHOS productos
//     // Retorna un arreglo (vacío si no hay coincidencias, o con los productos encontrados)
//     return productsData.filter((p) => p.categoryId === categoryId);
//   },

//   create: (newProduct) => {
//     const id = productsData.length + 1;
//     const productWithId = { id, ...newProduct };
//     productsData.push(productWithId);
//     return productWithId;
//   },

//   update: (id, updatedFields) => {
//     const index = productsData.findIndex((p) => p.id === id);
//     if (index === -1) return null;

//     productsData[index] = { ...productsData[index], ...updatedFields };
//     return productsData[index];
//   },

//   delete: (id) => {
//     const index = productsData.findIndex((product) => product.id === id);
//     if (index === -1) return false;
//     productsData.splice(index, 1);
//     return true;
//   },
// };

import pool from "../config/db.js"; // Asegúrate de tener este archivo creado

export const ProductModel = {
  // Obtener todos los productos desde MySQL
  findAll: async () => {
    const [rows] = await pool.query("SELECT * FROM products");
    return rows;
  },

  // Buscar por ID en MySQL
  findById: async (id) => {
    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
    return rows[0]; 
  },

  // Método relacional (Adaptado a SQL)
  findByCategoryId: async (categoryId) => {
    const [rows] = await pool.query("SELECT * FROM products WHERE categoryId = ?", [categoryId]);
    return rows;
  },

  // Crear nuevo producto en MySQL
  create: async (newProduct) => {
    const { name, price, categoryId } = newProduct;
    const [result] = await pool.query(
      "INSERT INTO products (name, price, categoryId) VALUES (?, ?, ?)",
      [name, price, categoryId]
    );
    return { id: result.insertId, ...newProduct };
  },

  // Actualizar en MySQL
  update: async (id, updatedFields) => {
    // Nota: Aquí usamos SET ? para actualizar campos dinámicos
    await pool.query("UPDATE products SET ? WHERE id = ?", [updatedFields, id]);
    return { id, ...updatedFields };
  },

  // Eliminar de MySQL
  delete: async (id) => {
    const [result] = await pool.query("DELETE FROM products WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
};
