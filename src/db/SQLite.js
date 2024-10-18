import { DatabaseSync } from "node:sqlite";

export const sqlite = () => {
  try {
    const db = new DatabaseSync("db.sqlite");

    db.exec(`
    create table if not exists cron (
         id integer primary key AUTOINCREMENT, 
         type text not null, 
         date date not null
    )`);

    if (db) db.close();
  } catch (error) {
    console.error(error);
  }
};

export const insertCronLog = () => {
  try {
    const db = new DatabaseSync("db.sqlite");
    const stmt = db.prepare(`
        INSERT OR REPLACE INTO logs (id, type, date) VALUES (?, ?, ?)
      `);

    const date = new Date().toISOString();

    const { lastInsertRowid } = stmt.run(1, "products_updated", date);

    console.log(`Inserted contact id: ${lastInsertRowid}`);
  } catch (error) {
    console.error(error);
  }
};

export const selectCronLog = () => {
  try {
    const db = new DatabaseSync("db.sqlite");
    const stmt = db.prepare(`
            SELECT * FROM logs WHERE id = ?
        `);

    const logs = stmt.all(1);
  } catch (error) {
    console.error(error);
  }
};
