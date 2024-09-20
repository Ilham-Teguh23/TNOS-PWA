import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Loading from "./components/utils/Loading";
import AppRoutes from "./route/AppRoutes";

function App() {
  const storeData = useSelector((store) => store?.global);
  const { isLoading } = storeData;

  return (
    <BrowserRouter>
      <ToastContainer />
      {isLoading && <Loading />}
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
