import { useState, useRef, useEffect } from 'react';
import '../css/TimePicker.css';

const HOURS = Array.from({ length: 6 }, (_, i) => i);   // [0, 1, 2, 3, 4, 5]
const MINUTES = Array.from({ length: 60 }, (_, i) => i); // [0, 1, 2, ..., 59]

function TimePicker({ hours, minutes, onChange }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="time-picker" ref={wrapperRef}>
      <button
        type="button"
        className="time-picker__trigger"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{hours}h {String(minutes).padStart(2, '0')}m</span>
        <span className={`time-picker__chevron ${open ? 'time-picker__chevron--up' : ''}`}>▾</span>
      </button>

      {open && (
        <div className="time-picker__popover">
          <div className="time-picker__column">
            <span className="time-picker__column-label">Hours</span>
            <div className="time-picker__list">
              {HOURS.map((h) => (
                <button
                  type="button"
                  key={h}
                  className={`time-picker__option ${h === hours ? 'time-picker__option--active' : ''}`}
                  onClick={() => onChange(h, minutes)}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>

          <div className="time-picker__column">
            <span className="time-picker__column-label">Minutes</span>
            <div className="time-picker__list">
              {MINUTES.map((m) => (
                <button
                  type="button"
                  key={m}
                  className={`time-picker__option ${m === minutes ? 'time-picker__option--active' : ''}`}
                  onClick={() => onChange(hours, m)}
                >
                  {String(m).padStart(2, '0')}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TimePicker;