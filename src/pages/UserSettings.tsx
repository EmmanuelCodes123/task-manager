import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import defaultImg from "../assets/defaultimg.jpg";
import { useUserContext } from "../hooks/useUserContext";
import AuthForm from "../components/auth/AuthForm";

export default function UserSettings() {
  const { userData } = useUserContext();
  return (
    <div>
      <Navbar />
      <div className="flex">
        <SideBar />
        <div className="flex-1 p-4 border-2 rounded h-screen mt-2 lg:mt-10 lg:mx-4 w-full border-gray-200 overflow-auto">
          <header className="flex justify-between items-center shrink-0 mb-4">
            <h2>Account Information</h2>
            <p>Go Back</p>
          </header>
          <div>
            <div className="flex gap-3 items-center">
              <div className="w-20 h-20 border-2 rounded-full border-gray-400 overflow-auto ">
                <img
                  src={defaultImg}
                  alt="user img"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div>
                <h2>{userData?.userName}</h2>
                <p>{userData?.email}</p>
              </div>
            </div>
            <div className="flex-grow mt-5 ">
                <AuthForm type="update" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
