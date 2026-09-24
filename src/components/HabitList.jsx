import HabitCard from './HabitCard';
import '../css/HabitList.css';

function HabitList({ habits, onPause, onCancel, onDelete }) {
  if (habits.length === 0) {
    return <p className="habit-list__empty">No habits yet — add one above to get started.</p>;
  }

  return (
    <div className="habit-list">
      {habits.map((habit, index) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          index={index}
          onPause={onPause}
          onCancel={onCancel}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default HabitList;