import mysql from 'mysql'

export function conectar(){
    const conect = mysql.createConnection({
        host: "localhost",
        // host: "database-1.cdykmaeac73x.us-east-2.rds.amazonaws.com ",
        port: 3306,
        user: "root",
        // user: "admin",
        password: "",
        // password: "admin123#",
        database: "practica_de_las_escuelas"
        // database: "database-1"
    })
    conect.connect(error => {
        if (error) throw error;
        console.log("Conectada correctamente a la base de datos")
    })
    return conect
}
