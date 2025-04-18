import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./Router";
import { useEffect, useState } from "react";
import { useStore } from "./store/store";

function App() {
  const store = useStore();
  useEffect(() => {
    const root = document.documentElement;
    if (store.theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [store.theme]);
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
