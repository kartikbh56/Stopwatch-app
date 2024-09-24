import { useRef, useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="app">
      <Navbar/>
      <StopWatch />
    </div>
  );
}

function StopWatch() {
  const [startedAt, setStartedAt] = useState(0);
  const [now, setNow] = useState(0);
  const [status, setStatus] = useState("initial");
  const timerId = useRef(null);

  const timeElapsed = now - startedAt;
  const milliseconds = timeElapsed % 1000;
  const seconds = Math.floor(timeElapsed / 1000) % 60;
  const minutes = Math.floor(timeElapsed / (1000 * 60)) % 60;
  const hours = Math.floor(timeElapsed / (1000 * 60 * 60)) % 60;

  useEffect(() => {
    if (status !== "initial") {
      document.title = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    } else {
      document.title = "Stopwatch";
    }
  }, [now, status, hours, minutes, seconds]);

  function startTimer() {
    return setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handleStart() {
    setStatus("started");
    setStartedAt(Date.now());
    setNow(Date.now());
    const id = startTimer();
    timerId.current = id;
  }

  function handlePause() {
    setStatus("paused");
    clearInterval(timerId.current);
    timerId.current = null;
  }

  function handleResume() {
    setStatus("started");
    const diff = Date.now() - now;
    setStartedAt(startedAt + diff);
    setNow(Date.now());
    const id = startTimer();
    timerId.current = id;
  }

  function handleReset() {
    setStatus("initial");
    setStartedAt(null);
    setNow(null);
  }

  return (
    <div className="stopwatch">
      <div className="time-display">
        {`${hours}`.padStart(2, "0")}{" : "}{`${minutes}`.padStart(2, "0")}{" : "}
        {`${seconds}`.padStart(2, "0")}
        <span className="milliseconds">
          .{`${milliseconds}`.padStart(3, "0")}
        </span>
      </div>
      <div className="controls">
        {status === "initial" && (
          <button onClick={handleStart} className="start">
            Start
          </button>
        )}
        {status === "started" && (
          <button onClick={handlePause} className="pause">
            Pause
          </button>
        )}
        {status === "paused" && (
          <>
            <button onClick={handleResume} className="resume">
              Resume
            </button>
            <button onClick={handleReset} className="reset">
              Reset
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Stopwatch</div>
    </nav>
  );
}
