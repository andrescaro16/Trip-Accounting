import { Outlet, Navigate } from "react-router-dom";

import { useStateContext } from "../Context/useStateContext";


const PrivateRoutes = () => {

    const { tokenId } = useStateContext();    

    return(
        tokenId ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes;