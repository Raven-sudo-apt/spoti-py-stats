import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx';
import UserSignUp from './components/UserSignUp.jsx';
import UserLogin from './components/UserLogin.jsx';
import notFound from './components/notFound.jsx';
import AuthUserHome from './components/AuthUserHome.jsx';
import './styles/home.css';
import './styles/forms.css';

function App(){

    return (
        <div>
            <Routes>
                <Route path='/' Component={Home} />
                <Route path="/user/login" Component={UserLogin} />
                <Route path="/user/signup" Component={UserSignUp} />
                <Route path="/home" Component={AuthUserHome} />
                <Route path="*" Component={notFound} />
            </Routes>
        </div>
    );
}
export default App;