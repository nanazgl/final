import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Learn from './pages/Learn';
import Contact from "./pages/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
    return (
        <div>
            <Router>
                <Header/>
                <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/learn" element={<Learn/>}/> {}
                        <Route path="/contact" element={<Contact/>}/>
                    </Routes>
                    <Footer backgroundColor="#d0e3ff" />
                </div>
            </Router>
        </div>
    );
}

export default App;
