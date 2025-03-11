import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Building } from "lucide-react"
import { cn } from "@/lib/utils"
import {StrikeManager} from "./strike-manager"

export function UserCard({ user, showStrikes = false, enableStrikeManagement = false, onStrikeChange }) {
    const getStrikeColor = (strikes) => {
        if(!strikes) return ""
        if(strikes === 1) return "bg-yellow border-yellow-200"
        if(strikes === 2) return "bg-orange border-orange-200"
        if(strikes === 3) return "bg-red border-red-200"
        return ""
    }
    return (
        <div className={cn(
            "border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow",
            showStrikes && getStrikeColor(user.strikes),
        )}>
            <div className="flex items-center space-x-4">
                <Link href={`/admin/perfil/${user.id}`}>
                    <div className="relative h-16 w-16 rounded-full overflow-hidden">
                        <Image src={user.imagen || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
                    </div>
                </Link>
                <div className="flex-1">
                    <Link href={`/admin/perfil/${user.id}`}>
                        <h3 className="font-medium text-lg hover:underline">{user.nombre}</h3>
                    </Link>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Building size={16} className="mr-1" />
                        <span>{user.institucion}</span>
                    </div>
                </div>
                {showStrikes && user.strikes && !enableStrikeManagement && (
                    <div className="flex items-center">
                        <div className="text-sm font-medium">
                            {user.strikes === 1 && "Strike 1"}
                            {user.strikes === 2 && "Strike 2"}
                            {user.strikes === 3 && "Strike 3"}
                        </div>
                    </div>
                )}
                {enableStrikeManagement && (
                    <StrikeManager initialStrikes = {user.strikes || 0} userId = {user.id} onStrikeChange = {onStrikeChange} />
                )}
            </div>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                <div className="flex items-center">
                    <Phone size={16} className="mr-2" />
                    <span>{user.telefono}</span>
                </div>
                <div className="flex items-center">
                    <Mail size={16} className="mr-2" />
                    <span>{user.email}</span>
                </div>
                <div className="flex items-center col-span-1 md:col-span-2">
                    <MapPin size={16} className="mr-2" />
                    <span>{user.direccion}</span>
                </div>
            </div>
        </div>
    )
}