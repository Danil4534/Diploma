import "./App.css";
import BigCalendar from "./components/BigCalendar";
import EventCalendar from "./components/EventCalendar";

import Header from "./components/Header";
import SearchInput from "./components/SearchInput";

function App() {
  return (
    <>
      <SearchInput />
      <Header />
      <EventCalendar />
      <BigCalendar />
    </>
  );
}

export default App;
