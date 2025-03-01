import React, { useState, useEffect, useRef } from "react";

const StopWatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
  };

  const handleStartStop = () => setIsRunning(!isRunning);
  
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps([...laps, time]);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="text-7xl font-bold font-mono tracking-wider mb-8 text-emerald-400">
            {formatTime(time)}
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={handleStartStop}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                isRunning
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-emerald-500 hover:bg-emerald-600"
              }`}
            >
              {isRunning ? "Stop" : "Start"}
            </button>
            <button
              onClick={handleLap}
              disabled={!isRunning}
              className="px-8 py-3 rounded-lg font-semibold bg-teal-600 hover:bg-teal-700 transition-all duration-300 disabled:opacity-50"
            >
              Lap
            </button>
            <button
              onClick={handleReset}
              className="px-8 py-3 rounded-lg font-semibold bg-teal-500 hover:bg-teal-600 transition-all duration-300"
            >
              Reset
            </button>
          </div>

          {laps.length > 0 && (
            <div className="bg-teal-800 rounded-lg p-4 max-h-60 overflow-auto">
              <h3 className="text-xl font-semibold mb-4 text-emerald-400">Laps</h3>
              {laps.map((lapTime, index) => (
                <div
                  key={index}
                  className="flex justify-between py-2 border-b border-teal-700"
                >
                  <span>Lap {laps.length - index}</span>
                  <span className="font-mono">{formatTime(lapTime)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StopWatch;
