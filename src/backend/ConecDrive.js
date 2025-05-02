import { google } from 'googleapis'
import stream from 'stream'

const auth = new google.auth.GoogleAuth({
  keyFile: './artful-line-457204-v2-8d2c12099790.json',
  scopes: ['https://www.googleapis.com/auth/drive']
})

export async function subirArchivoADrive(nombre, tipoMime, buffer, folderId) {
  const authClient = await auth.getClient()
  const drive = google.drive({ version: 'v3', auth: authClient })

  const bufferStream = new stream.PassThrough()
  bufferStream.end(buffer)

  const response = await drive.files.create({
    requestBody: {
      name: nombre,
      mimeType: tipoMime,
      parents: [folderId]
    },
    media: {
      mimeType: tipoMime,
      body: bufferStream
    },
    fields: 'id'
  })

  const fileId = response.data.id

  // Hacer público
  await drive.permissions.create({
    fileId,
    requestBody: {
      role: 'reader',
      type: 'anyone'
    }
  })

  return `https://drive.google.com/file/d/${fileId}/view`
}
