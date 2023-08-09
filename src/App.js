import './App.css';
import ProfilePage from './components/ProfilePage';
import Registration from './components/Registration';
import Login from './components/Login';
import Logout from './components/Logout';
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Navbar from './components/Navbar';
import UpdateUser from './components/UpdateUser';
import ResetPassword from './components/ResetPassword';
import ViewUsers from './components/ViewUsers';
import Home from './components/Home';
//import ProfilePage from './components/ProfilePage';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Navbar/>

      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/updateprofile" element={<UpdateUser/>}/>
        <Route path="/updatepassword" element={<ResetPassword/>}/>
        <Route path="/users" element={<ViewUsers/>}/>
        <Route path="/home" element={<Home/>}/>


        
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
