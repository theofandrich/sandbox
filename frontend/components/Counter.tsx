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
      {/* Use padStart to ensure the display format is "0000ms" */}
      <p>Increment Time: {`${incrementTime}`.padStart(4, '0')}ms</p>
      <p>Refresh Time: {`${refreshTime}`.padStart(4, '0')}ms</p>
      <p style={{ fontSize: "2.5em" }}>{count?.toString()}</p>
      <button className="connect-button" onClick={increment}>+</button>
    </div>
  );
};

export { Counter };