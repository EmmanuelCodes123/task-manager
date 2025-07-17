import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/DashBoard";
import DefaultPath from "./hooks/defaultPath";
import UseProvider from "./hooks/useProvider";

function App() {
  
  return (
    <>
      <UseProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <DefaultPath>
                  <Dashboard />
                </DefaultPath>
              }
            />
          </Routes>
        </BrowserRouter>
      </UseProvider>
    </>
  );
}

export default App;
