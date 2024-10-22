import React from "react";
import AllRoutes from "./routes/AllRoutes";
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "./contexts/AuthContext";
const App = () => {
  return (
    <AuthProvider>
      <div className="app font-garamond">
        <AllRoutes />
      </div>
    </AuthProvider>
  );
};

export default App;
