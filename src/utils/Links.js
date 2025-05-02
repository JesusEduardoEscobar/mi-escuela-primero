/* 
Esta funcion permite devolver un link con el que se podra mostrar la imagen 
en la pagina web para que no sea necesario descargarla.
En se devuelven dos links diferenctes una para la imagen y otro para el pdf
las varables ya especifican cual es cual0
*/
export function getDirectLink(shareableLink) {
  let fileId = ''
  if (shareableLink.includes('/file/d/')) {
    fileId = shareableLink.split('/file/d/')[1].split('/')[0]
  } else if (shareableLink.includes('id=')) {
    fileId = shareableLink.split('id=')[1].split('&')[0]
  } else if (/^[a-zA-Z0-9_-]+$/.test(shareableLink)) {
    fileId = shareableLink
  }

  if (!fileId) {
    // console.error("No se pudo extraer el ID del archivo")
    return null
  }

  return {
    directLinkImage: `https://lh3.googleusercontent.com/d/${fileId}=s1000`,
    directLinkPDF: `https://drive.google.com/file/d/${fileId}/preview`,
  }
}
