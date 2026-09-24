import { useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import HabitForm from "../components/HabitForm";
import HabitList from "../components/HabitList";
import NavBar from "../components/NavBar";
import StatsBar from "../components/StatsBar";
import Toast from "../components/Toast";
import "../css/Home.css";

function Home() {
  const [habits, setHabits] = useLocalStorage("habitgrid-habits", []);
  const [toast, setToast] = useState({ message: "", type: "success" });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHabits((prevHabits) =>
        prevHabits.map((habit) => {
          if (habit.status !== "running") return habit;
          const newRemaining = Math.max(habit.remainingSeconds - 1, 0);

          if (newRemaining === 0) {
            const today = new Date().toISOString().split("T")[0];
            return {
              ...habit,
              remainingSeconds: 0,
              status: "completed",
              completedDates: habit.completedDates.includes(today)
                ? habit.completedDates
                : [...habit.completedDates, today],
            };
          }
          return { ...habit, remainingSeconds: newRemaining };
        }),
      );
    }, 1000);
    return () => clearInterval(intervalId);
  }, [setHabits]);

  const handleAddHabit = (newHabit) => {
    const hasRunning = habits.some((h) => h.status === "running");
    if (hasRunning) {
      setToast({
        message:
          "Adding failed — pause the current habit before adding another.",
        type: "error",
      });
      return;
    }
    setHabits((prev) => [...prev, newHabit]);
    setToast({
      message: `"${newHabit.name}" added successfully!`,
      type: "success",
    });
  };

  const handleToggleRun = (habitId) => {
    setHabits((prev) => {
      const target = prev.find((h) => h.id === habitId);
      if (!target) return prev;
      if (target.status === "running") {
        return prev.map((h) =>
          h.id === habitId ? { ...h, status: "paused" } : h,
        );
      }
      return prev.map((h) => {
        if (h.id === habitId) return { ...h, status: "running" };
        if (h.status === "running") return { ...h, status: "paused" };
        return h;
      });
    });
  };

  const handleCancel = (habitId) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === habitId ? { ...h, status: "cancelled" } : h)),
    );
  };

  const handleDelete = (habitId) => {
    setHabits((prev) => prev.filter((h) => h.id !== habitId));
  };

  return (
    <div className="home">
      <div className="home__inner">
        <NavBar habits={habits} />
        <StatsBar habits={habits} />
        <HabitForm onAddHabit={handleAddHabit} />
        <h2 className="home__section-title">Your habits</h2>
        <HabitList
          habits={habits}
          onPause={handleToggleRun}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      </div>
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "success" })}
      />
    </div>
  );
}

export default Home;
