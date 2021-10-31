import React from 'react';

// Routing
// @ts-ignore
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//Components
import Header from './components/Header';
import Home from './components/Home';

// Global Style
import { GlobalStyle } from './GlobalStyle';

const App: React.FC = () => (
    <Router>
        <Header />
        <Routes>
            <Route path='/' element={<Home />} />
        </Routes>
        <GlobalStyle />
    </Router>
);

export default App;