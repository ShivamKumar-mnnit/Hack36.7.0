import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import UserSelect from "./pages/UserSelect";
import Protected from "./pages/Protected";
import Homepage from "./pages/homepage/Homepage";
import Register from "./pages/Authentication/Register";
import Profile from "./pages/Authentication/Profile";
import Recovery from "./pages/Authentication/Recovery";
import Reset from "./pages/Authentication/Reset";
import Password from "./pages/Authentication/Password";
import Username from "./pages/Authentication/Username";
import Dashboard from "./pages/Dashboard/Dashboard";
import Cars from "./pages/Cars/Cars";
import NoteState from "./components/Notes/Context/NoteState";
import AddNote from "./components/Notes/AddNote";
import Noteitem from "./components/Notes/NoteItem";
import Notes from "./components/Notes/Notes";
import SearchBar from "./components/Notes/Searchbar";
import { AuthorizeUser, ProtectRoute } from "./middleware/auth";
import Admin from "./pages/AdminDash/Admin";
import LobbyScreen from "./screens/Lobby";
import RoomPage from "./screens/Room";



const router = createBrowserRouter(
  createRoutesFromElements(
    <>

        <Route path="/" element={<Homepage />} />
        <Route path='register' element={<Register/>}/>
        <Route path="adminpage" element={<Admin />} />
        <Route
          path="profile"
          element={
              <Profile />
          }
        />
        
        <Route path="recovery" element={<Recovery />} />
        <Route path="reset" element={<Reset />} />
        <Route path="password" element={<Password />} />
        <Route path="username" element={<Username />} />
        <Route path="home" element={<Home />} />
        <Route path="user-select" element={<UserSelect />} />
        <Route path="login" element={<Login />} />
        <Route path="protected" element={<Protected />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="cars" element={<Cars />} />
        <Route path="dashboard" element={<NoteState><Dashboard/></NoteState>} />
        <Route path="addnote" element={<NoteState><AddNote /></NoteState>} />
        <Route path="note" element={<NoteState><Notes/></NoteState>} />
        <Route path="noteitem" element={<NoteState><Noteitem/></NoteState>} />
        <Route path="lobby" element={<LobbyScreen />} />
        <Route path="room/:roomId" element={<RoomPage />} />
        
        
  
    </>
  ),
  { basename: "/" }
);

export default router;
