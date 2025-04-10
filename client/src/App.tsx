import { BrowserRouter } from "react-router-dom";
import "./App.css";
import BigCalendar from "./components/BigCalendar";
import EventCalendar from "./components/EventCalendar";

import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import SearchInput from "./components/SearchInput";
import Router from "./Router";

function App() {
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      {/* <SearchInput />
      <Header />
      <EventCalendar />
      <BigCalendar />
      <LoginForm />
      <RegisterForm /> */}
    </>
  );
}

export default App;
