import mysql from 'mysql'

export function conectar(){
    const conect = mysql.createConnection({
        host: "database-1.cdykmaeac73x.us-east-2.rds.amazonaws.com",
        port: 3306,
        user: "admin",
        password: "admin123#",
        database: "proyecto"
    })
    conect.connect(error => {
        if (error) throw error;
        console.log("Conectada correctamente a la base de datos")
    })
    return conect
}
