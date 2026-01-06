import React from 'react';
import DisplayArtists from './components/displayArists.jsx';
import { Route, Routes } from 'react-router-dom';

function App(){

    return (
        <div>
            <Routes>
                <Route path="/artists" element={<DisplayArtists />} />
            </Routes>
        </div>
    );
}
export default App;