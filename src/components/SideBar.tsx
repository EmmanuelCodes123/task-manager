import { Badge, List, LogOut, NotepadText, Settings } from "lucide-react";
import { useEffect, useRef } from "react";
import defaultImg from "../assets/defaultimg.jpg";
import { useUserContext } from "../hooks/useUserContext";
import { useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";

export default function SideBar() {
  const userImage = defaultImg
  const { userData, handleViewTask, openSideBar, setOpenSideBar } =
    useUserContext();
  const sideBar = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (openSideBar && sideBar.current) {
      sideBar.current.style.transition = "transform 0.3s ease-in-out";
      sideBar.current.style.transform = openSideBar
        ? "translateX(0)"
        : "translateX(-270px)";
    }
  }, [openSideBar]);

  const pages = [
    {
      name: "Dashboard",
      icon: <Badge />,
      click: () => navigate("/", { replace: true }),
    },

    {
      name: "My Tasks",
      icon: <NotepadText />,
      click: () => handleViewTask(),
    },
    {
      name: "Task Categories",
      icon: <List />,
      click: () => navigate("/taskcategories", { replace: true }),
    },
    {
      name: "User Settings",
      icon: <Settings />,
      click: () => navigate("/usersettings", { replace: true }),
    },
  ];

  return (
    <aside
      className={cn(
        "w-67 mt-10 rounded-xl bg-black text-white p-3 absolute left-0 top-11 bottom-0 z-300 lg:relative lg:top-0",
        "transition-transform duration-300 ease-in-out"
      )}
      ref={sideBar}
      style={{
        transform:
          window.innerWidth < 1024
            ? openSideBar
              ? "translateX(0px)"
              : "translateX(-270px)"
            : "none",
      }}
    >
      <div className="w-full flex flex-col items-center">
        <div className="w-15 h-15 rounded-4xl border-2 border-gray-400 mt-[-40px]">
          <img className="w-full h-full rounded-4xl" src={userImage} alt="" />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-lg">{userData?.userName}</h2>
          <p className="text-sm">{userData?.email}</p>
        </div>
      </div>
      <div className="mt-7 flex flex-col gap-5 pr-3">
        {pages.map((page) => (
          <div
            className="flex gap-4 items-center cursor-pointer hover:bg-red-400 p-2 rounded-lg transition"
            key={page.name}
            onClick={() => {
              page.click?.();
              setOpenSideBar((c) => !c);
            }}
          >
            <div>{page.icon}</div>
            <div className="text-xl">{page.name}</div>
          </div>
        ))}
      </div>

      <div>
        <button className="flex items-center gap-2 cursor-pointer absolute bottom-5 left-3 text-lg hover:text-red-400">
          <LogOut /> Logout
        </button>
      </div>
    </aside>
  );
}
