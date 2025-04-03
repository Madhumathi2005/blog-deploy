import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserContextProvider } from './UserContext';
import IndexPage from './Pages/IndexPage';
import RegistrationPage from './Pages/Registration';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import CreateBlogPage from './Pages/CreateBlogPage';
import MyBlogPage from './Pages/MyBlogPage';
import SingleBlogPage from './Pages/SingleBlogPage';
import Header from './Header';  
import './App.css';
import Subscription from './Pages/Subscription';
import Profile from './Pages/Profle';

const App = () => {
  return (
    <UserContextProvider>
      <Router>
        <Header /> 
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create" element={<CreateBlogPage />} />
          <Route path="/blogs" element={<MyBlogPage />} />
          <Route path="/blogs/:id" element={<SingleBlogPage />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/profile" element={<Profile/>}></Route>
        </Routes>
      </Router>
    </UserContextProvider>
  );
};

export default App;
