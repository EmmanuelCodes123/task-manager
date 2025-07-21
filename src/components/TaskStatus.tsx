import { useEffect, useState } from "react";
import { ClipboardCheck } from "lucide-react";
import { useUserContext } from "../hooks/useUserContext";
import {StatusBar} from "./StatusBar";

export default function TasksStatus() {
  const { tasks } = useUserContext();

  const [notStarted, setNotStarted] = useState(0);
  const [inProgress, setInProgress] = useState(0);
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    function calcStatus(length: number) {
      return tasks.length === 0 ? 0 : (length / tasks.length) * 100;
    }

    const notStarted = tasks.filter((t) => t.status === "Not Started");
    const inProgress = tasks.filter((t) => t.status === "In Progress");
    const completed = tasks.filter((t) => t.status === "Completed");

    setNotStarted(() => calcStatus(notStarted.length));
    setInProgress(() => calcStatus(inProgress.length));
    setCompleted(() => calcStatus(completed.length));
  }, [tasks]);

  const statusDivs = [
    {
      color: "#FF4C4C",
      text: "Not Started",
      state: Math.round(notStarted),
    },
    {
      color: "#0088FE",
      text: "In Progress",
      state: Math.round(inProgress),
    },
    {
      color: "#00C49F",
      text: "Completed",
      state: Math.round(completed),
    },
  ];

  return (
    <section className="shadow-md rounded w-full h-[170px] p-4 pt-2">
      <header className="flex items-center gap-2 mt-1">
        <ClipboardCheck/>
        <h2 className="text-red-400 font-semibold">Task Status</h2>
      </header>
      <div className="w-full h-full gap-6 flex justify-center items-center">
        {statusDivs.map((div, i) => {
          const chartData = [
            { name: div.text, value: div.state, color: div.color },
            { name: "Remaining", value: 100 - div.state, color: "#e5e7eb" },
          ];
          return (
            <div key={i} className="flex flex-col items-center relative w-[90px]">
              <StatusBar chartData={chartData} dataKey="value" innerRadius={25} outerRadius={35} width={80} height={80} stroke="none"/>
              <div className="absolute top-7.5 text-sm font-semibold flex pointer-events-none select-none">{div.state}%</div>
              <div className="mt-2 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: div.color }}></span>
                <p className="text-xs">{div.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
