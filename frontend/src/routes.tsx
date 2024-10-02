

import Login from "./pages/Login";
import { Route,  Routes } from "react-router-dom";
import Home from "./pages/Home";
import Board from "./pages/Board";

const routes = () =>{
    return(
        <Routes>
            <Route path="/" element={<Login></Login>} ></Route>
            <Route path="/home" element={<Home></Home>} ></Route>
            <Route path="/board" element={<Board></Board>} ></Route>
        </Routes>
    )
}

export default routes;