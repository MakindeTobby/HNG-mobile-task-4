import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseAsync("orders.db");

export async function setupDatabase(db) {
  try {
    await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS orders (
             id INTEGER PRIMARY KEY AUTOINCREMENT,
      orderData TEXT NOT NULL
            );
        `);
    console.log("Database initialised");
  } catch (error) {
    console.log("Error while initializing database : ", error);
  }
}

// export const saveOrder = async (orderData) => {
//   try {
//     const result = await db.executeAsync(
//       "INSERT INTO orders (orderData) VALUES (?)",
//       JSON.stringify(orderData)
//     );
//     return result.lastInsertRowId;
//   } catch (error) {
//     console.log("Error while saving order:", error);
//   }
// };

// export const getOrders = async () => {
//   const allRows = await db.getAllAsync("SELECT * FROM orders");
//   return allRows.map((row) => ({
//     id: row.id,
//     orderData: JSON.parse(row.orderData),
//   }));
// };
