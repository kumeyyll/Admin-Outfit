import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // isi kalau MySQL kamu ada password
  database: "spk_outfit_syari",
});
