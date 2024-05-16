import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./Home";
import {DetailPage} from "./Details.jsx";
import {Navbar} from "./components/Navbar";

export function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/detail/:id" element={<DetailPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}
