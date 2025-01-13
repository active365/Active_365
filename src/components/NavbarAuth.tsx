import { UserContext } from "@/context/UserContext"
import Link from "next/link"
import { useContext } from "react"

const NavbarAuth:React.FC = ()=>{
    const {handleLogout} =  useContext(UserContext)

    return(<>
    <Link href="/dashboardUser" className="btn">
              Dashboard
            </Link>

    <button onClick={handleLogout} className="btn">Logout</button>
    
    </>)
}

export default NavbarAuth