import { useState } from 'react';
import TimePicker from './TimePicker';
import '../css/HabitForm.css';

function HabitForm({ onAddHabit }) {
  const [name, setName] = useState('');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(30);

  const handleTimeChange = (newHours, newMinutes) => {
    setHours(newHours);
    setMinutes(newMinutes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const totalSeconds = hours * 3600 + minutes * 60;
    if (totalSeconds <= 0) return;

    onAddHabit({
      id: crypto.randomUUID(),
      name: name.trim(),
      totalSeconds,
      remainingSeconds: totalSeconds,
      status: 'running',
      completedDates: [],
    });

    setName('');
    setHours(0);
    setMinutes(30);
  };

  return (
    <form className="habit-form" onSubmit={handleSubmit}>
      <div className="habit-form__search">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="What habit are you focusing on?"
        />
      </div>

      <div className="habit-form__row">
        <TimePicker hours={hours} minutes={minutes} onChange={handleTimeChange} />
        <button type="submit" className="habit-form__submit">Add habit</button>
      </div>
    </form>
  );
}

export default HabitForm;