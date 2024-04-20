import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Register from "./pages/Authentication/Register";
import Profile from "./pages/Authentication/Profile";
import Recovery from "./pages/Authentication/Recovery";
import Reset from "./pages/Authentication/Reset";
import Password from "./pages/Authentication/Password";
import Username from "./pages/Authentication/Username";
import Dashboard from "./pages/Dashboard/Dashboard";




import { AuthorizeUser, ProtectRoute } from './middleware/auth'
import Admin from "./pages/AdminDash/Admin";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* <Route path="/" element={<Layout />}> */}

      <Route path="/" element={<Register />} />
      <Route path="adminpage" element={<Admin />} />
      <Route
        path="profile"
        element={
          <ProtectRoute>
            <Profile />
          </ProtectRoute>
        }
      />
      <Route path="recovery" element={<Recovery />} />
      <Route path="reset" element={<Reset />} />
      <Route path="password" element={<Password />} />
      <Route path="username" element={<Username />} />
      <Route path="dashboard" element={<Dashboard />} />
      {/* </Route> */}
    </>
  ),
  // { basename: import.meta.env.DEV ? "/" : "/react-face-auth/" }
  { basename: "/" }
);

export default router;
