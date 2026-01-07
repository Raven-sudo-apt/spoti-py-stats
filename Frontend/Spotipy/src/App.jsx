import React from 'react';
import DisplayArtists from './components/displayArists.jsx';
import { Route, Routes } from 'react-router-dom';
import Users from './components/UserSignUp.jsx';
import Home from './components/Home.jsx';
import UserSignUp from './components/UserSignUp.jsx';

function App(){

    return (
        <div>
            <Routes>
                <Route path='/' Component={Home} />
                <Route path="/user/login" Component={Users} />
                <Route path="/user/signup" Component={UserSignUp} />
            </Routes>
        </div>
    );
}
export default App;