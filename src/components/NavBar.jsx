import '../css/NavBar.css';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

function NavBar({ habits }) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const activeCount = habits.filter((h) => h.status !== 'cancelled').length;

  return (
    <header className="navbar">
      <button className="navbar__menu" aria-label="Menu">
        <span /><span /><span />
      </button>

      <div className="navbar__greeting">
        <p className="navbar__hello">{getGreeting()}, Kani</p>
        <h1 className="navbar__headline">
          You have <span className="navbar__highlight">{activeCount}</span> habit{activeCount !== 1 ? 's' : ''} today
        </h1>
        <span className="navbar__date">{today}</span>
      </div>

      <div className="navbar__avatar">KV</div>
    </header>
  );
}

export default NavBar;