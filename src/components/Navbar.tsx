import { AlignJustify, Search } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";

export default function Navbar() {
  const [searchValue, setSearchValue] = useState("");
  const today = new Date();
  const day = today.toLocaleDateString("en-GB", { weekday: "long" });
  const date = today.toLocaleDateString("en-GB");
  const location = useLocation();
  const {setOpenSideBar} = useUserContext()


  return (
    <nav className="flex shadow-md lg:space-x-36 space-x-3 lg:mx-auto pt-2 pb-2 pl-4 pr-4 items-center w-screen lg:w-fit">
      <div className="hidden lg:block">
        {location.pathname === "/" ? (
          <h1 className="text-3xl">
            <span className="text-[#ff6767]">Dash</span>board
          </h1>
        ) : (
          <h1 className="text-3xl">
            <span className="text-[#ff6767]">To</span>-Do
          </h1>
        )}
      </div>
      <div className="lg:hidden ">
        <button onClick={() => setOpenSideBar(c => !c)}>
          <AlignJustify />
        </button>
      </div>

      <div className="flex lg:w-2xl w-full items-center">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => {
            const value = e.target;
            setSearchValue(value.value);
          }}
          className="lg:w-2xl w-full h-10 rounded shadow-md"
        />
        <button className="bg-[#ff6767] rounded w-10 h-10 flex items-center justify-center">
          <Search className="text-white" />
        </button>
      </div>
      
      <div className="hidden lg:block">
        <h2>{day}</h2>
        <p>{date}</p>
      </div>
    </nav>
  );
}
