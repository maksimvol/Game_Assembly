import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import React, { useEffect, useState } from 'react';

import Layout from './pages/Layout';
import Home from './pages/Home';
import RecordsPage from './pages/RecordsPage';
import Contacts from './pages/Contacts';
import NoPage from './pages/NoPage';

import AddApp from './pages/Adding/AddApp';
import AddGame from './pages/Adding/AddGame';
import AddJackpot from './pages/Adding/AddJackpot';
import AddMath from './pages/Adding/AddMath';

import UpdateApp from './pages/Updating/UpdateApp';
import UpdateGame from './pages/Updating/UpdateGame';
import UpdateMath from './pages/Updating/UpdateMath';
import UpdateJackpot from './pages/Updating/UpdateJackpot';

import ChosenApp from './pages/Chosen/ChosenApp';
import ChosenGame from './pages/Chosen/ChosenGame';
import ChosenMath from './pages/Chosen/ChosenMath';
import ChosenJackpot from './pages/Chosen/ChosenJackpot';

import Footer from './components/Footer';
import Navbar from './components/Navbar';

import Login from './pages/LoginPages/Login';
import Register from './pages/LoginPages/Register';
import Profile from './pages/LoginPages/Profile';
import ProtectedRoute from './pages/ProtectedRoute';

export default function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
  };
  
  return (
    <Router>
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<RecordsPage />} />

            <Route path="login" element={<Login setUser={setUser}/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile user={user} onLogout={handleLogout}/>} />
            
            <Route path="/home" element={<Home />} />

            <Route path="addGame" element={
                <ProtectedRoute user={user} allowedRoles={['admin']}>
                  <AddGame />
                </ProtectedRoute>
              } 
            />
            <Route path="addApp" element={
                <ProtectedRoute user={user} allowedRoles={['admin']}>
                  <AddApp />
                </ProtectedRoute>
              } 
            />
            <Route path="addJackpot" element={
                <ProtectedRoute user={user} allowedRoles={['admin']}>
                  <AddJackpot />
                </ProtectedRoute>
              } 
            />
            <Route path="addMath" element={
                <ProtectedRoute user={user} allowedRoles={['admin']}>
                  <AddMath />
                </ProtectedRoute>
              } 
            />

            <Route path="chosenApp/:setId" element={
                <ProtectedRoute user={user} allowedRoles={['admin', 'user']}>
                  <ChosenApp user={user}/>
                </ProtectedRoute>
              } 
            />
            <Route path="chosenAppUpdate/:setId" element={
                <ProtectedRoute user={user} allowedRoles={['admin']}>
                  <UpdateApp/>
                </ProtectedRoute>
              } 
            />

            <Route path="chosenGame/:gameId" element={
                <ProtectedRoute user={user} allowedRoles={['admin', 'user']}>
                  <ChosenGame user={user}/>
                </ProtectedRoute>
                } 
              />
            <Route path="chosenGameUpdate/:gameId" element={
                <ProtectedRoute user={user} allowedRoles={['admin']}>
                  <UpdateGame/>
                </ProtectedRoute>
              } 
            />

            <Route path="chosenMath/:mathId" element={
                <ProtectedRoute user={user} allowedRoles={['admin', 'user']}>
                  <ChosenMath user={user}/>
                </ProtectedRoute>
              } 
            />
            <Route path="chosenMathUpdate/:mathId" element={
                <ProtectedRoute user={user} allowedRoles={['admin']}>
                  <UpdateMath/>
                </ProtectedRoute>
              } 
            />

            <Route path="chosenJackpot/:jackpotId" element={
                <ProtectedRoute user={user} allowedRoles={['admin', 'user']}>
                  <ChosenJackpot user={user}/>
                </ProtectedRoute>
              } 
            />
            <Route path="chosenJackpotUpdate/:jackpotId" element={
                <ProtectedRoute user={user} allowedRoles={['admin']}>
                  <UpdateJackpot/>
                </ProtectedRoute>
              } 
            />

            <Route path="contacts" element={<Contacts />} />
            <Route path="*" element={<NoPage/>} />
          </Route>
        </Routes>
        <Footer />
    </Router>
  );
};

let container= document.getElementById('root')
let root = createRoot(container!);
root.render(<App />);