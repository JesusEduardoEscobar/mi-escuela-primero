import { CirclePlus, User, HomeIcon, MessageCircle} from "lucide-react";

export const itemsNavbar = [
    {
        id: 1,
        title: "Home",
        icon: <HomeIcon size={25} color="#fff" strokeWidth={1} />,
        link: "/paginaPrincipal",
    },
    {
        id: 2,
        title: "Mensaje",
        icon: <MessageCircle size={25} color="#fff" strokeWidth={1} />,
        link: "/mensajes",
    },
    {
        id: 3,
        title: "Agregar",
        icon: <CirclePlus size={25} color="#fff" strokeWidth={1} />,
        link: "/agregar",
    },
    {
        id: 4,
        title: "Perfil",
        icon: <User size={25} color="#fff" strokeWidth={1} />,
        link: "/perfil",
    },
]