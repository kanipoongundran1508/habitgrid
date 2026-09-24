import { getCurrentStreak, getLongestStreak } from '../utils/streaks';
import HeatmapGrid from './HeatmapGrid';
import '../css/HabitCard.css';

function formatTime(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map((unit) => String(unit).padStart(2, '0')).join(':');
}

function HabitCard({ habit, index, onPause, onCancel, onDelete }) {
  const elapsed = habit.totalSeconds - habit.remainingSeconds;
  const percentDone = Math.min(100, Math.round((elapsed / habit.totalSeconds) * 100));

  const currentStreak = getCurrentStreak(habit.completedDates);
  const longestStreak = getLongestStreak(habit.completedDates);

  const variantClass =
    habit.status === 'completed'
      ? 'habit-card--completed'
      : habit.status === 'cancelled'
      ? 'habit-card--cancelled'
      : `habit-card--g${index % 4}`;

  return (
    <div className={`habit-card ${variantClass} ${habit.status === 'paused' ? 'habit-card--paused' : ''}`}>
      <div className="habit-card__top">
        <span className="habit-card__name">{habit.name}</span>
        <button className="habit-card__delete" onClick={() => onDelete(habit.id)} aria-label="Delete">
          ✕
        </button>
      </div>

      <div className="habit-card__streaks">
        <span className="habit-card__streak-badge">🔥 {currentStreak}d streak</span>
        <span className="habit-card__streak-badge habit-card__streak-badge--ghost">Best {longestStreak}d</span>
      </div>

      {(habit.status === 'running' || habit.status === 'paused') && (
        <>
          <p className="habit-card__timer">{formatTime(habit.remainingSeconds)}</p>
          <div className="habit-card__progress-track">
            <div className="habit-card__progress-fill" style={{ width: `${percentDone}%` }} />
          </div>
          <div className="habit-card__actions">
            <button className="habit-card__btn" onClick={() => onPause(habit.id)}>
              {habit.status === 'running' ? '⏸ Pause' : '▶ Resume'}
            </button>
            <button className="habit-card__btn habit-card__btn--ghost" onClick={() => onCancel(habit.id)}>
              Cancel
            </button>
          </div>
        </>
      )}

      {habit.status === 'completed' && (
        <p className="habit-card__message">✅ Completed today — focused {formatTime(habit.totalSeconds)}</p>
      )}

      {habit.status === 'cancelled' && (
        <p className="habit-card__message">Cancelled — focused {formatTime(elapsed)} before stopping</p>
      )}

      <HeatmapGrid completedDates={habit.completedDates} />
    </div>
  );
}

export default HabitCard;