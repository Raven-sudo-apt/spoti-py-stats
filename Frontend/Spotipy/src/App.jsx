import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import Home from './components/Home.jsx';
import UserSignUp from './components/UserSignUp.jsx';
import UserLogin from './components/UserLogin.jsx';
import notFound from './components/notFound.jsx';
import AuthUserHome from './components/AuthUserHome.jsx';
import Tracks from './components/Tracks.jsx';
import MyProfile from './components/MyProfile.jsx';
import './styles/home.css';
import './styles/forms.css';
import './styles/modal.css';
import './styles/profile.css';


function App(){

    return (
        <AuthProvider>
            <Routes>
                <Route path='/' Component={Home} />
                <Route path="/user/login" Component={UserLogin} />
                <Route path="/user/signup" Component={UserSignUp} />
                <Route path="/home" Component={AuthUserHome} />
                <Route path="*" Component={notFound} /> 
                <Route path='/tracks' Component={Tracks} />
                <Route path='/user/:id' Component={MyProfile} />
            </Routes>
        </AuthProvider>
    );
}
export default App;