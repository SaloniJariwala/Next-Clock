import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { Divider } from "antd";
import styles from "../../styles/StopWatch.module.css";
import BtnStopWatch from "./BtnStopWatch";
import DisplayStopWatch from "./DisplayStopWatch";
import { BiExport } from "react-icons/bi";

const StopWatch = () => {
  const [isInaterval, setIsIntaerVal] = useState();
  const [status, setStatus] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [lapTime, setlapTime] = useState([]);
  const [flag, setFlag] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const [stopWatchData,setStopWatchData]=useState();


let data;
  let result = getData();
 result.then(function(item) {
  data=item;
  setStopWatchData(data)
 })


  const [time, setTime] = useState({
    lastId: 0,
    milisecond: 0,
    second: 0,
    minute: 0,
    hour: 0,
  });
  let updtaeMs = time.milisecond;
  let updateSecond = time.second;
  let updateMinute = time.minute;
  let updateHour = time.hour;
  let lastId = 1;

  // set stopwatch Time
  const setStopWatchTime = () => {
    if (updateMinute === 60) {
      updateHour++;
      updateMinute = 0;
    }
    if (updateSecond === 60) {
      updateMinute++;
      updateSecond = 0;
    }
    if (updtaeMs === 60) {
      updateSecond++;
      updtaeMs = 0;
    }
    updtaeMs++;
    return setTime({
      milisecond: updtaeMs,
      second: updateSecond,
      minute: updateMinute,
      hour: updateHour,
    });
  };

  // stopwatsh start
  const startStopWatch = () => {
    if (!isRunning) {
      setIsRunning(true);
      setStopWatchTime();
      setIsIntaerVal(setInterval(setStopWatchTime, 10));
      setStatus(1);
    }
  };

  const stop = () => {
    setIsRunning(false);
    clearInterval(isInaterval);
    setStatus(2);
  };

  // stopwatsh stop
  const reset = () => {
    clearInterval(isInaterval);
    setStatus(0);
    setTime({ milisecond: 0, second: 0, minute: 0, hour: 0 });
    localStorage.removeItem("stopWatchLap");
  };

  // stopwatsh resume
  const resume = () => {
    setStatus(2);
    startStopWatch();
    const getTime = JSON.parse(localStorage.getItem("stopWatchLap")) || [];
    setlapTime(getTime);
  };

  // display timing
  const lap = () => {
    setIsRunning(true);
    const allStopTime = JSON.parse(localStorage.getItem("stopWatchLap")) || [];
    startStopWatch();
    allStopTime.push(time);
    allStopTime.reverse();
    localStorage.setItem("stopWatchLap", JSON.stringify(allStopTime));
    setlapTime(
      localStorage.setItem("stopWatchLap", JSON.stringify(allStopTime))
    );
    setFlag(!flag);
    setCsvData(allStopTime);
  };

  useEffect(() => {
    const allStopTime = JSON.parse(localStorage.getItem("stopWatchLap")) || [];
    setlapTime(allStopTime);
    setFlag(flag);
  }, [flag]);

  return (
    <div className={styles.stopWatch}>
      <div className={styles.stopwatch_timer}>
        <DisplayStopWatch time={time} />
      </div>
      <BtnStopWatch
        startStopWatch={startStopWatch}
        status={status}
        stop={stop}
        reset={reset}
        resume={resume}
        isRunning={isRunning}
        lap={lap}
      />
      <Divider />
      {/* display lap his */}
      <div className={styles.lap_timing}>
        <div className={styles.lap_title}>LapHistory</div>
        <div>
          {lapTime?.length > 0 && (
            <>
              <table className={styles.lap_table}>
                <thead>
                  <tr>
                    <th className={styles.lap_table_th}>Time</th>
                    <th className={styles.lap_table_th}>Total Time</th>
                  </tr>
                </thead>
                <tbody>
                  {lapTime &&
                    lapTime.map((time) => (
                      <tr>
                        <td className={styles.lap_table_td}>
                          {time.minute}:{time.second}:{time.milisecond}
                        </td>
                        <td className={styles.lap_table_td}></td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
      <div>
        <CSVLink
          data={csvData}
          style={{ width: "100%", textDecoration: "none" }}
        >
          <button className={styles.csv_button}>
            <BiExport />
            Export To CSV
          </button>
        </CSVLink>

      <div className={styles.stopwatch_text}>{stopWatchData}</div>
      </div>

    </div>
  );
};

async function getData(){
  return new Promise((resolve, reject) => {
 
    const data = `Misk pände pålig respektive nojagt töng. Lavis jass geonas. Pren platågen, kron. Jölarad trektigt semobelt för pront, det soment. Foliga geofott, hehen och jadosa. 
    Saskap bejörade polyr. Vide loskade, fast plaspeheling till maktig alltså ara. Jögen tetranar. Arad prerade plapovis. Spena sonde osat jaskapet i plajöliga. 
    Falingar intrarerock. Hexarer kvasilig diren nyr. Febel agisamma. Gången fyhyr. Lapossade multidade, din ifall rerorad.`
    resolve(data);
   });
}

export default StopWatch;
