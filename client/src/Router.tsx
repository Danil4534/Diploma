import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import HomePage from "./pages/HomePage";

import { SideBarNav } from "./components/SideBarNav";
import TeachersPage from "./pages/TeachersPage";
import SubjectPage from "./pages/SubjectPage";
import StudentsPage from "./pages/StudentsPage";
import GroupsPage from "./pages/GroupsPage";
import UserProfile from "./pages/UserProfile";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/homepage" element={<SideBarNav />}>
        <Route path="teachers" element={<TeachersPage />} />
        <Route path="subjects" element={<SubjectPage />} />
        <Route path="events" element={<TeachersPage />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="groups" element={<GroupsPage />} />
        <Route path="profile" element={<UserProfile />} />
      </Route>
    </Routes>
  );
}
export default Router;
