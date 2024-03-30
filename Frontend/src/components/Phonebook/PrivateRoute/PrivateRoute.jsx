import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router"

export const PrivateRoute = ({children}) => {
    const {token} = useSelector((state)=>state.auth)
    const location = useLocation()
    return token ? children : <Navigate to='/login' state={location}/>
}