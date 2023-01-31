import React, { useEffect } from "react";
import styles from "../../styles/Timer.module.css";
import BtnTimer from "./BtnTimer";

function DisplayTimer({
  timerHour,
  timerSecond,
  timerMinute,
  timerDay,
  isFlag,
}) {
  return (
    <div>
      {isFlag ? (
        <>
          <div className={styles.display}>
              {timerDay < 10 ? "0" + timerDay : timerDay}:
              {timerHour < 10 ? "0" + timerHour : timerHour}:
              {timerMinute < 10 ? "0" + timerMinute : timerMinute}:
              {timerSecond < 10 ? "0" + timerSecond : timerSecond}
          </div>
        </>
      ) : (
        <>
          <div className={styles.display}>
              {timerHour < 10 ? "0" + timerHour : timerHour}:
              {timerMinute < 10 ? "0" + timerMinute : timerMinute}:
              {timerSecond < 10 ? "0" + timerSecond : timerSecond}
          </div>
        </>
      )}
    </div>
  );
}

export default DisplayTimer;
