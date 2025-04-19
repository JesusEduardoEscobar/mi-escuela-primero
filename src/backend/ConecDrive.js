import { google } from 'googleapis'
import fs from 'fs'

const auth = new google.auth.GoogleAuth({
    keyFile: './artful-line-457204-v2-ff104f96e3a3.json',
    scopes: ['https://www.googleapis.com/auth/drive']
})

export async function subirArchivoADrive(nombre, tipoMime, rutaLocal, folderId) {
    const authClient = await auth.getClient()
    const drive = google.drive({ version: 'v3', auth: authClient })

    const response = await drive.files.create({
        requestBody: {
            name: nombre,
            mimeType: tipoMime,
            parents: [folderId]
        },
        media: {
            mimeType: tipoMime,
            body: fs.createReadStream(rutaLocal)
        }
    })

    const fileId = response.data.id

    // Hacer el archivo público (opcional)
    await drive.permissions.create({
        fileId,
        requestBody: {
            role: 'reader',
            type: 'anyone'
        }
    })

    // Devolver link de vista
    return `https://drive.google.com/file/d/${fileId}/view`
}
