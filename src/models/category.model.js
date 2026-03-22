import categoriesData from "../data/categories.data.js";
import pool from "../config/db.js";

// export const CategoryModel = {
//   findAll: () => {
//     return categoriesData;
//   },

//   findById: (id) => {
//     return categoriesData.find((c) => c.id === id);
//   },

//   create: (newCategory) => {
//     // Generamos un ID basado en la longitud del arreglo (simulación de Auto Increment)
//     const id = categoriesData.length + 1;
//     const categoryWithId = { id, ...newCategory };
//     categoriesData.push(categoryWithId);
//     return categoryWithId;
//   },

//   update: (id, updatedFields) => {
//     const index = categoriesData.findIndex((c) => c.id === id);
//     if (index === -1) return null;

//     // Fusionamos los datos existentes con los campos a actualizar
//     categoriesData[index] = { ...categoriesData[index], ...updatedFields };
//     return categoriesData[index];
//   },

//   delete: (id) => {
//     const index = categoriesData.findIndex((category) => category.id === id);
//     if (index === -1) return false;

//     // Eliminamos 1 elemento en la posición encontrada
//     categoriesData.splice(index, 1);
//     return true;
//   },
// };

export const CategoryModel = {
  // 1. Obtener todas las categorías de la tabla
  findAll: async () => {
    const [rows] = await pool.query("SELECT * FROM categories");
    return rows;
  },

  // 2. Buscar una categoría por su ID
  findById: async (id) => {
    const [rows] = await pool.query("SELECT * FROM categories WHERE id = ?", [id]);
    return rows[0]; // Retorna la categoría o undefined si no existe
  },

  // 3. Crear una nueva categoría
  create: async (newCategory) => {
    const { name } = newCategory;
    const [result] = await pool.query("INSERT INTO categories (name) VALUES (?)", [name]);
    // Devolvemos el objeto con el ID que generó automáticamente MySQL
    return { id: result.insertId, name };
  },

  // 4. Actualizar una categoría existente
  update: async (id, updatedFields) => {
    // Usamos SET ? para que MySQL tome los campos del objeto automáticamente
    await pool.query("UPDATE categories SET ? WHERE id = ?", [updatedFields, id]);
    return { id, ...updatedFields };
  },

  // 5. Eliminar una categoría
  delete: async (id) => {
    const [result] = await pool.query("DELETE FROM categories WHERE id = ?", [id]);
    // Retornamos true si se eliminó una fila, false si no se encontró el ID
    return result.affectedRows > 0;
  },
};