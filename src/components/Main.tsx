import { useUserContext } from "../hooks/useUserContext";
import CompletedTasks from "./CompletedTasks";
import OpenTasks from "./OpenTasks";
import TasksStatus from "./TaskStatus";

export default function Main() {
  const { userData } = useUserContext();

  return (
    <main className="lg:mt-10 lg:ml-15 lg:w-220 w-screen">
      <header className="ml-10 mb-4 hidden lg:block">
        <h2 className="text-3xl">Welcome back, {userData?.userName} 👋</h2>
      </header>
      <section className="flex lg:flex-row flex-col gap-10 lg:border-2 border-[#d9d9de] rounded w-full lg:px-4 py-3">
        <OpenTasks />
        <div>
          <TasksStatus />
          <CompletedTasks />
        </div>
      </section>
    </main>
  );
}
