import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./Home";
import {NoMatch} from "./NoMatch";
import {DetailPage} from "./Details.jsx";
import {Navbar} from "./components/Navbar";
import {AuthProvider} from "./Auth";
import {Login} from "./Login";

export function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/detail/:id" element={<DetailPage/>}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="*" element={<NoMatch/>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
