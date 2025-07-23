import CategorySetter from "../components/CategorySetter";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { useUserContext } from "../hooks/useUserContext";

export default function TaskCategories() {
  const {status, priority} = useUserContext();
  

  return (
    <div >
      <Navbar />
      <div className="flex">
        <SideBar />
        <div className="flex-1 p-4 border-2 rounded h-screen mt-2 lg:mt-10 lg:mx-4 w-full border-gray-200">
          <header className="flex justify-between items-center mb-4">
            <h2>Task Categories</h2>
            <p>Go Back</p>
          </header>
          <div>
            <CategorySetter title="Task Status" categories={status} />
          </div>
          <div className="mt-10">
            <CategorySetter title="Task Priority" categories={priority} />
          </div>
        </div>
      </div>
    </div>
  );
}
