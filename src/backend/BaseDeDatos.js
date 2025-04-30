import mysql from "mysql";

export function conectar() {
  const conect = mysql.createConnection({
    host: "database-1.cdykmaeac73x.us-east-2.rds.amazonaws.com",
    // host: "database-1.cdykmaeac73x.us-east-2.rds.amazonaws.com ",
    port: 3306,
    user: "admin",
    // user: "admin",
    password: "admin123#",
    // password: "admin123#",
    database: "proyecto",
    // database: "proyecto"
  });
  conect.connect((error) => {
    if (error) {
      console.error("❌ Error al conectar a MySQL:", error.message);
      return;
    }
    console.log("✅ Conectada correctamente a la base de datos");
  });
  return conect;
}
