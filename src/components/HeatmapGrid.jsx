import '../css/HeatmapGrid.css';

function buildDayRange(numDays) {
  const days = [];
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  for (let i = numDays - 1; i >= 0; i--) {
    const day = new Date(cursor);
    day.setDate(day.getDate() - i);
    days.push(day.toISOString().split('T')[0]);
  }

  return days; // oldest first, today last
}

function HeatmapGrid({ completedDates, weeks = 13 }) {
  const days = buildDayRange(weeks * 7);
  const dateSet = new Set(completedDates);

  return (
    <div className="heatmap">
      {days.map((dateStr) => (
        <div
          key={dateStr}
          className={`heatmap__cell ${dateSet.has(dateStr) ? 'heatmap__cell--filled' : ''}`}
          title={dateStr}
        />
      ))}
    </div>
  );
}

export default HeatmapGrid;