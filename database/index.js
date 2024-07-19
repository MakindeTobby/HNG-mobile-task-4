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
