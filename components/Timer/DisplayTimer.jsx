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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isFlag ? (
        <>
          <div className={styles.display_timer_main}>
            <div className={styles.display_timer_hour}>
              {timerDay < 10 ? "0" + timerDay : timerDay}
              <span className={styles.display_timer_dots}>:</span>
            </div>
            <div className={styles.display_timer_hour}>
              {timerHour < 10 ? "0" + timerHour : timerHour}
              <span className={styles.display_timer_dots}>:</span>
            </div>

            <div className={styles.display_timer_hour}>
              {timerMinute < 10 ? "0" + timerMinute : timerMinute}
              <span className={styles.display_timer_dots}>:</span>
            </div>

            <div className={styles.display_timer_hour}>
              {timerSecond < 10 ? "0" + timerSecond : timerSecond}
              <span className={styles.display_timer_dots}></span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.display_timer_main}>
            {/* <small style={{ fontFamily: "serif", fontSize: 40 }}>
            {title ? title:"TiTle"}
            </small> */}
            <div className={styles.display_timer_hour}>
              {timerHour < 10 ? "0" + timerHour : timerHour}
              <span className={styles.display_timer_dots}>:</span>
            </div>

            <div className={styles.display_timer_hour}>
              {timerMinute < 10 ? "0" + timerMinute : timerMinute}
              <span className={styles.display_timer_dots}>:</span>
            </div>

            <div className={styles.display_timer_hour}>
              {timerSecond < 10 ? "0" + timerSecond : timerSecond}
              <span className={styles.display_timer_dots}></span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DisplayTimer;
