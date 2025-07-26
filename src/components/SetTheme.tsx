import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function SetTheme() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored) return stored === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const handleThemeToggle = () => setIsDark((prev) => !prev);

  return (
    <button
      onClick={handleThemeToggle}
      className="px-2 rounded bg-gray-200 dark:bg-gray-800 dark:text-white"
    >
       {isDark ? <Sun /> : <Moon />} 
    </button>
  );
}
