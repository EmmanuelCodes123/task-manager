import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/DashBoard";
import DefaultPath from "./hooks/defaultPath";
import UseProvider from "./hooks/useProvider";
import ViewTasks from "./components/ViewTask";
import { NuqsAdapter } from 'nuqs/adapters/react-router/v6'

function App() {
  return (
    <>
      <BrowserRouter>
        <UseProvider>
          <NuqsAdapter>
            <Routes>
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/viewtask" element={<ViewTasks />} />
              <Route
                path="/"
                element={
                  <DefaultPath>
                    <Dashboard />
                  </DefaultPath>
                }
              />
            </Routes>
          </NuqsAdapter>
        </UseProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
