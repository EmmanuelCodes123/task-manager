import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/DashBoard";
import DefaultPath from "./hooks/defaultPath";
import UseProvider from "./hooks/useProvider";
import ViewTasks from "./pages/ViewTask";
import { NuqsAdapter } from "nuqs/adapters/react-router/v6";
import TaskCategories from "./pages/TaskCategories";
import UserSettings from "./pages/UserSettings";

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
              <Route path="/taskcategories" element={<TaskCategories />} />
              <Route path="/usersettings" element={<UserSettings />} />
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
