import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { BO_1 } from "bo_1";
import { BO_2 } from "bo_2";

import { CustomMenu } from "./components/menu";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/bo_1/*"
        element={
          <BO_1
            authProvider={() => {}}
            envVariables={{}}
            CustomMenu={CustomMenu}
          />
        }
      />
      <Route
        path="/bo_2/*"
        element={
          <BO_2
            authProvider={() => {}}
            envVariables={{}}
            CustomMenu={CustomMenu}
          />
        }
      />
      <Route path="/" element={<Navigate to="/bo_1" />} />
    </Routes>
  );
};

const MainApp = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default MainApp;
