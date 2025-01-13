import { GymContext } from "@/context/GymContext"
import Link from "next/link"
import { useContext } from "react"

const NavbarGym:React.FC = ()=>{
    const { handleGymLogout} =  useContext(GymContext)

    return(<>
    <Link href="/dashboardGym" className="btn">
              Dashboard Gym
    </Link>

    <button onClick={ handleGymLogout} className="btn">Logout</button>
    
    </>)
}

export default NavbarGym