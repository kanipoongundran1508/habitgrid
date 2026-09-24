function daysBetween(dateStrA, dateStrB) {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((new Date(dateStrB) - new Date(dateStrA)) / msPerDay);
}

export function getCurrentStreak(completedDates) {
  if (completedDates.length === 0) return 0;

  const dateSet = new Set(completedDates);
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  const todayStr = cursor.toISOString().split('T')[0];
  if (!dateSet.has(todayStr)) {
    // Today isn't marked done yet, but the day isn't over —
    // don't zero out the streak just because of that, check from yesterday instead
    cursor.setDate(cursor.getDate() - 1);
  }

  let streak = 0;
  while (dateSet.has(cursor.toISOString().split('T')[0])) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

export function getLongestStreak(completedDates) {
  if (completedDates.length === 0) return 0;

  const sorted = [...completedDates].sort();
  let longest = 1;
  let current = 1;

  for (let i = 1; i < sorted.length; i++) {
    const gap = daysBetween(sorted[i - 1], sorted[i]);
    if (gap === 1) {
      current++;
      longest = Math.max(longest, current);
    } else if (gap > 1) {
      current = 1;
    }
  }

  return longest;
}