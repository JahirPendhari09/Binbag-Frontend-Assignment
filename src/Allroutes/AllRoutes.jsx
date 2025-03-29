import { Route, Routes } from "react-router-dom"
import { Task } from "../views/Task"
import { Navbar } from "./Navbar"

const AllRoutes =()=>{
    return <>
    <Navbar/>
    <Routes>
        <Route path="/" element={<Task/>}/>
    </Routes>
    </>
}

export {AllRoutes}