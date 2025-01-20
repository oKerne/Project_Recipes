import { useContext } from "react"
import SideMenu from "./Recipr/SideMenu"
import User from "./user/User"
import { UserContext } from "./user/userReducer"
import { Outlet } from "react-router"
import AllRecipes from "./Recipr/AllRecipe"
//  import { Grid2 } from "@mui/material"

const c = () => {

    const { state } = useContext(UserContext)


    return (
        <>
            {/* <Grid2> */}
                <User /> {/* size 6*/}
                {!!(state.id) && (
                 <SideMenu userId={state.id} setShowAllRecipes={() => { }} />
                 )} 
                {/* <SideMenu userId={state.id} setShowAllRecipes={() => { }} /> */}
                 <AllRecipes />
                <Outlet />
        </>
    )
}

export default c
