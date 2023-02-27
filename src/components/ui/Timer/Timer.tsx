import { useEffect, useState } from "react";
import { timerDifFromNow } from "utils/helpers/date.helpers";

const Timer = ({ dueDate }: { dueDate: Date }) => {
  const [currentTime, setcurrentTime] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setcurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <span>
      {timerDifFromNow(dueDate.getTime() / 1000 - currentTime.getTime() / 1000)}
    </span>
  );
};

export default Timer;
