const rutasTitulos = {
    "/usuarios/paginaPrincipal": "Alianzas realizadas",
    "/usuarios/perfil": "Perfil",
    "/usuarios/mensajes": "Mensajes",
    "/usuarios/matches": "Encuentra tu match perfecto",
}

export function getPageTitle(pathname) {
    console.log("Checking title for pathname:", pathname)
    if(rutasTitulos[pathname]) {
        return rutasTitulos[pathname]
    }
    for( const ruta in rutasTitulos) {
        if(pathname.startsWith(ruta)) {
            return rutasTitulos[ruta]
        }
    }
    return "Mi escuela primero"
}