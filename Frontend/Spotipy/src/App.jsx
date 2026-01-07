import React from 'react';
import DisplayArtists from './components/displayArists.jsx';
import { Route, Routes } from 'react-router-dom';
import Users from './components/Users.jsx';
import Home from './components/Home.jsx';
import './styles/App.css';

function App(){

    return (
        <div>
            <Routes>
                <Route path='/' Component={Home} />
                <Route path="/users/login" Component={Users} />
                <Route path="/users/signup" Component={Users} />
            </Routes>
        </div>
    );
}
export default App;