import { AlignJustify } from "lucide-react";
import {
  useCallback,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useLocation } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import type { TaskSchemaType } from "./auth/AuthTask";

interface NavbarProps {
  setCurrentTasks?: Dispatch<SetStateAction<TaskSchemaType[]>>;
}

export default function Navbar({ setCurrentTasks }: NavbarProps) {
  const [searchValue, setSearchValue] = useState("");
  const today = new Date();
  const day = today.toLocaleDateString("en-GB", { weekday: "long" });
  const date = today.toLocaleDateString("en-GB");
  const location = useLocation();
  const { setOpenSideBar, tasks } = useUserContext();

  const handleSearch = useCallback(() => {
    if (setCurrentTasks) {
      setCurrentTasks(() =>
        tasks.filter((task) =>
          task.title.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
      if (searchValue.trim() === "") {
        setCurrentTasks(tasks);
      }
    }
  }, [searchValue, setCurrentTasks, tasks]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <nav className="flex shadow-md lg:space-x-36 space-x-3 lg:mx-auto pt-2 pb-2 pl-4 pr-4 items-center w-screen lg:w-fit dark:bg-white ">
      <div className="hidden lg:block">
        {location.pathname === "/" ? (
          <h1 className="text-3xl dark:text-black">
            <span className="text-[#ff6767]">Dash</span>board
          </h1>
        ) : (
          <h1 className="text-3xl">
            <span className="text-[#ff6767]">To</span>-Do
          </h1>
        )}
      </div>
      <div className="lg:hidden ">
        <button onClick={() => setOpenSideBar((c) => !c)}>
          <AlignJustify />
        </button>
      </div>

      <div className="flex lg:w-2xl w-full items-center">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          className="lg:w-2xl w-full h-10 rounded shadow-md dark:bg-white dark:text-white"
        />
        
      </div>

      <div className="hidden lg:flex gap-2">
        {/* <SetTheme /> */}
        <div className="text-black">
          <h2>{day}</h2>
          <p>{date}</p>
        </div>
      </div>
    </nav>
  );
}
