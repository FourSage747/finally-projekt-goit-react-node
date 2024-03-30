import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router"

export const PublicRoute = ({children}) => {
    const {token} = useSelector((state)=>state.auth)
    const {state} = useLocation()
    return !token ? children : <Navigate to={state ? state : '/'} />
}