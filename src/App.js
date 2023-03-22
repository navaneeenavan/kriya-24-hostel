import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavRoutes from "./Navroutes";
import EventDetails from "./pages/EventDetails";
import Login from "./pages/Login";
import PaperDetails from "./pages/PaperDetails";
import PortalWrapper from "./pages/PortalWrapper";
import WorkDetails from "./pages/WorkDetails";
import "./styles/tailwind.output.css";

const App = () => {
  return (
    <React.Fragment>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="" element={<PortalWrapper />}>
            <Route path="/event-details/:id" element={<EventDetails />} />
            <Route path="/paper-details/:id" element={<PaperDetails />} />
            <Route path="/work-details/:id" element={<WorkDetails />} />
            {NavRoutes.map((n) => (
              <Route path={n.href} element={n.element} />
            ))}
            <Route path="*" element={<p></p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
