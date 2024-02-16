import { useCanister } from "@connect2ic/react";
import React, { useEffect, useState } from "react";

const Counter = () => {
  const [counter] = useCanister("counter");
  const [count, setCount] = useState<bigint>();
  // Initialize times with 0
  const [incrementTime, setIncrementTime] = useState<number>(0);
  const [refreshTime, setRefreshTime] = useState<number>(0);

  const refreshCounter = async () => {
    const startTime = Date.now();
    const freshCount = await counter.getValue() as bigint;
    const endTime = Date.now();
    setCount(freshCount);
    setRefreshTime(endTime - startTime);
  };

  const increment = async () => {
    const incrementStartTime = Date.now();
    await counter.increment();
    const incrementEndTime = Date.now();
    setIncrementTime(incrementEndTime - incrementStartTime);
    await refreshCounter();
  };

  useEffect(() => {
    if (!counter) {
      return;
    }
    refreshCounter();
  }, [counter]);

  return (
    <div className="example">
      <div className="time-container">
        <div className="time-entry">
          <span className="time-label">Update Time:</span>
          <span className="time-value">{`${incrementTime}`.padStart(4, '0')} ms</span>
        </div>
        <div className="time-entry">
          <span className="time-label">Query Time:</span>
          <span className="time-value">{`${refreshTime}`.padStart(4, '0')} ms</span>
        </div>
        <div className="time-entry">
          <span className="time-label">Total:</span>
          <span className="time-value">{`${refreshTime + incrementTime}`.padStart(4, '0')} ms</span>
        </div>
      </div>
      <div className="center-content">
        <div className="centered-item">
          <p className="count-number">{count?.toString()}</p>
          <button className="connect-button" onClick={increment}>+</button>
        </div>
      </div>
    </div>
  );
  
  
  
};

export { Counter };