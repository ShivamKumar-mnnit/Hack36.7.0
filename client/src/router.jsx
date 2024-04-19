import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard"



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
     

        <Route path="dashboard" element={<Dashboard />} />
     
   
    </>
  ),
  { basename: "/" }
);

export default router;
