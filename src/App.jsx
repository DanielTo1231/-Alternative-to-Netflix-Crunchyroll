import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./Home";
import {DetailPage} from "./Details.jsx";

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/detail/:id" element={<DetailPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}
