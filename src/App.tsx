import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Suspense } from "react";
import Router from "./routes/sections";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        closeOnClick
        style={{ transition: "Bounce" }}
      />
      <Suspense>
        <Router />
      </Suspense>
    </>
  );
}

export default App;
