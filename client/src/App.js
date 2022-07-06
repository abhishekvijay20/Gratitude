import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Home from "./components/Home/Home";
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';

// Version with myPosts feature

const theme = createTheme({
    palette: {
        primary: {
            main: '#465375'
        },
        secondary: {
            main: '#E33E7F'
            // main: '#959BBD'
        },
        tertiary: {
            main: '#EFF4F8'
        },
    }
  });

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    return (
        <MuiThemeProvider theme={theme}>
            <Router>
                <Container maxidth="xl" >
                <div 
                // style ={{position: 'fixed'}}
                >
                <Navbar />
                </div>
                    <Routes>
                        {/* <Route path="/" exact element={<Home/>}/> */}
                        <Route path="/" exact element={<Navigate to="/posts" />}/>
                        <Route path="/posts" exact element={<Home/>} />
                        <Route path="/myPosts/:id" exact element={<Home/>} />
                        <Route path="/posts/search" exact element={<Home/>} />
                        <Route path="/posts/:id" exact element={<PostDetails/>} />
                        <Route path="/auth" exact element={!user ? <Auth /> : <Navigate to="/posts" />}/>
                    </Routes>
                </Container>
            </Router>
    </MuiThemeProvider>
    );
};

export default App;