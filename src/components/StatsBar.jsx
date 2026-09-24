import { getCurrentStreak } from '../utils/streaks';
import '../css/StatsBar.css';

function StatsBar({ habits }) {
  const tracked = habits.length;
  const focusingNow = habits.filter((h) => h.status === 'running').length;

  const bestStreak = habits.reduce((max, h) => {
    const streak = getCurrentStreak(h.completedDates);
    return streak > max ? streak : max;
  }, 0);

  const stats = [
    { label: 'Habits tracked', value: tracked, icon: '📋', variant: 'violet' },
    { label: 'Focusing now', value: focusingNow, icon: '▶', variant: 'amber' },
    { label: 'Best streak', value: `${bestStreak}d`, icon: '🔥', variant: 'mint' },
  ];

  return (
    <div className="stats-bar">
      {stats.map((stat) => (
        <div className="stats-bar__item" key={stat.label}>
          <div className={`stats-bar__icon stats-bar__icon--${stat.variant}`}>
            {stat.icon}
          </div>
          <span className="stats-bar__value">{stat.value}</span>
          <span className="stats-bar__label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

export default StatsBar;