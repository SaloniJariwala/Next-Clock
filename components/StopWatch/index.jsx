        
import { useEffect, useState } from "react";
import styles from "../../styles/StopWatch.module.css"
import DisplayStopWatch from "./DisplayStopWatch";
import BtnStopWatch from "./BtnStopWatch";
import { Divider } from "antd";

const StopWatch = ({data}) => {
  console.log(data);

  const [isActive, setIsActive] = useState(false);
    const [time, setTime] = useState(0);
    const [interval, setIsInterval] = useState();
    const [ispaused, setIsPaused] = useState(false);
    const [islap, setlap] = useState([]);
    const [totalTime, setTotalTime] = useState([]);
    // const [sum, setSum] = useState([0]); 
  
    const lap = () => {
      const getTime = JSON.parse(localStorage.getItem("time")) || [];
      setTime((time) => time + 10);
      getTime.push(time);
      getTime.reverse();
      // getTime.reverse();
      localStorage.setItem("time", JSON.stringify(getTime));
      setlap(getTime);
    };
    useEffect(() => {
      setlap(JSON.parse(localStorage.getItem("time")) || []);
      if (isActive && ispaused === false) {
        setIsInterval(
          setInterval(() => {
            setTime((time) => time + 10);
          }, 10)
        );
      }
      return clearInterval(interval);
    }, [isActive, ispaused]);
  
    const handleStart = () => {
      setIsActive(true);
    };

    const Resume=()=>{
      setIsActive(false);
      setIsPaused(false);
      handleStart();
    }
  
    const handleReset = () => {
      setIsActive(false);
      setTime(0);
    };
  
    const stop = () => {
      setIsPaused(!ispaused);
      handleStart();
    };
  
    const totalSum = (item) => {
      debugger
      let total = 0;
      debugger
      totalTime.forEach((time) => {
        total=time;
        total = total + time;
      });
      debugger
      let sum = 0;
      debugger
      sum = total + item;
      debugger
      totalTime.push(sum);
      debugger
      return sum;
    };
  
    const convertTime = (time) => {
      const sum = `${("0" + (Math.floor(time / 60000) % 60)).slice(-2)}:${(
        "0" +
        (Math.floor(time / 1000) % 60)
      ).slice(-2)}:${("0" + (Math.floor(time / 10) % 100)).slice(-2)}`;
      return sum;
    };
  
    function msToTime(time) {
      var milliseconds = parseInt((time % 1000) / 100)
          , seconds = parseInt((time / 1000) % 60)
          , minutes = parseInt((time / (1000 * 60)) % 60)
          , hours = parseInt((time / (1000* 60 *60)) % 24);
  
      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;
  
      return  minutes + ":" + seconds + "." + milliseconds;
  };
  return (
    <div className={styles.stopWatch}>
      <div className={styles.stopwatch_timer}>
         <DisplayStopWatch time={time} msToTime={msToTime} />
       </div>
       <BtnStopWatch
        isActive={isActive}
        ispaused={ispaused}
        handleStart={handleStart}
        stop={stop}
        handleReset={handleReset}
        lap={lap}
        Resume={Resume}
      />
      <Divider />
      
      <table>
      <thead>
      <tr>
            <th>Lap</th>
            <th>Time</th>    
            <th>Total</th>
          </tr>
      </thead>
      <tbody>
      <td>
      {islap?.map((item, index) => (
        <tr key={index}>
          <td>
            {("0" + (Math.floor(item / 60000) % 60)).slice(-2)}:
            {("0" + (Math.floor(item / 1000) % 60)).slice(-2)}:
            {("0" + (Math.floor(item / 10) % 100)).slice(-2)}
          </td>
              <td>{convertTime(totalSum(item))}</td>
        </tr>
      ))}
        </td>
      </tbody>
      </table>

    </div>
  )
}

export default StopWatch;
