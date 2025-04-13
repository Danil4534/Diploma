import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import HomePage from "./pages/HomePage";

import { SideBarNav } from "./components/SideBarNav";
import TeachersPage from "./pages/TeachersPage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/homepage" element={<SideBarNav />}>
        <Route path="teachers" element={<TeachersPage />} />
        <Route path="subjects" element={<TeachersPage />} />
        <Route path="events" element={<TeachersPage />} />
        <Route path="students" element={<TeachersPage />} />
        <Route path="groups" element={<TeachersPage />} />
      </Route>
    </Routes>
  );
}
export default Router;
