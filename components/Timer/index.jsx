import React, { use, useEffect, useRef, useState } from "react";
import DisplayTimer from "./DisplayTimer";
import BtnTimer from "./BtnTimer";
import { Divider, Progress } from "antd";
import SpecificSecond from "./SpecificSecond";
import SpecificMinute from "./SpecificMinute";
import SpecificTimerHour from "./SpecificTimerHour";
import SetTimerModal from "./setTimerModal";
import { useForm } from "react-hook-form";
import { notifyUser } from "../../utils/notification";
import defaultTimerSound from "../../Assets/audios/alarm.mp3";
import DisplayTimerModal from "./RingTimerModal";
import { audioData } from "../../data/audios";
import styles from "../../styles/Timer.module.css";
import { CSVLink } from "react-csv";
import { BiExport } from "react-icons/bi";

function Timer({ data }) {
  const methods = useForm();
  const { control } = methods;

  const timerAudioRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [timerModal, setTimeModal] = useState(false);
  const [timerHour, setTimerHour] = useState(0);
  const [timerMinute, setTimerMinute] = useState(0);
  const [timerSecond, setTimerSecond] = useState(0);
  const [timerDay, setTimerDays] = useState(0);
  const [sound, setSound] = useState(defaultTimerSound);
  const [isInaterval, setIsInterVal] = useState();
  const [title, setTitle] = useState("Test Title");
  const [onZero, setOnZero] = useState("stoptimer");
  const [volume, setVolume] = useState(50);
  const [flag, setFlag] = useState(false);
  const [isResume, setIsResume] = useState(false);
  const [isFlag, setIsFlag] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [dateIntval, setDateIntval] = useState(null);
  const [id, setId] = useState(0);
  let timerId = id;
  let timeoutId = isInaterval;
  let updateDateTime = timerDay;
  let updateSecond = timerSecond;
  let updateMinute = timerMinute;
  let updateHour = timerHour;

  const playAudio = () => {
    timerAudioRef.current?.play();
    // timerAudioRef.current.volume = parseFloat(volume / 100);
    timerAudioRef.current.loop = true;
  };

  const pause = () => {
    setShowModal(false);
    setTimeModal(false);
    timerAudioRef.current.pause();
  };

  const TimerModalClose = () => {
    setShowModal(false);
    if (isEdit) {
      setIsEdit(false);
    }
  };

  const handleCloseRing = () => {
    pause();
    debugger
    const getItem = JSON.parse(localStorage.getItem("timer")) || [];
    debugger
    getItem.forEach((item) => {
      if(item.timerId === timerId){
        if (getItem.onzero === "stoptimer") {
          setTimerSecond(0);
          setTimerMinute(0);
          setTimerHour(0);
          setFlag(true);
        } else {
          getTimers();
          setIsResume(false);
        }
      }
    })
  };

  const setTimer = (hour = 0, minute = 0, second = 0) => {
    if (hour !== 0 && minute !== 0 && second !== 0) {
      updateHour = hour;
      updateMinute = minute;
      updateSecond = second;
    }
    if (updateSecond > 60) {
      updateMinute++;
      updateSecond = parseInt(updateSecond) - 59;
    }
    if (updateMinute > 60) {
      updateHour++;
      updateMinute = parseInt(updateMinute) - 60;
    }
    updateMinute = updateMinute > 60 ? 60 : updateMinute;
    if (updateSecond !== 0) {
      const sec = `${updateSecond <= 10 ? "0" : ""}${updateSecond--}`;
      setTimerSecond(sec);
    } else if (updateMinute !== 0 && updateSecond === 0) {
      updateSecond = 59;
      const min = `${updateMinute <= 10 ? "0" : ""}${updateMinute--}`;
      setTimerMinute(min);
    } else if (updateHour !== 0 && updateMinute === 0) {
      updateMinute = 60;
      const hr = `${updateHour <= 10 ? "0" : ""}${updateHour--}`;
      setTimerHour(hr);
    } else {
      return;
    }
    const getTimer = JSON.parse(localStorage.getItem("timer")) || [];
    setId(getTimer?.timerId);
    setTimerSecond(updateSecond);
    setTimerMinute(updateMinute);
    setTimerHour(updateHour);
    setTitle(title);
    count();
  };

  function count() {
    if (
      updateDateTime === 0 &&
      updateHour === 0 &&
      updateMinute === 0 &&
      updateSecond === 0
    ) {
      const timer = JSON.parse(localStorage.getItem("timer")) || [];
      timer.forEach((item) => {
        playAudio();
        if (item.timerId === timerId) {
          notifyUser(item?.title);
          setTimeModal(true);
          clearInterval(timeoutId);
          clearInterval(dateIntval);
          setFlag(false);
          // const history = {
          //   timerId : item?.timerId,
          //   updateHour : item?.hour,
          //   updateMinute : item?.minute,
          //   updateSecond : item?.second,
          //   sound: item?.sound,
          //   title: item?.title,
          //   onzero: item?.onzero,
          //   volume: item?.volume,
          // };
          // timer.push(history);
          // localStorage.setItem("his", JSON.stringify(timer));
        }
      });
    } else if (
      updateDateTime > 0 &&
      updateHour > 0 &&
      updateMinute > 0 &&
      updateSecond > 0
    ) {
      if (updateSecond === 0) {
        updateMinute -= 1;
        updateSecond = 60;
      }
    }
  }

  const getTimers = () => {
    const getTimer = JSON.parse(localStorage.getItem("timer")) || [];
    getTimer.forEach((item) => {
      timerId = getTimer?.timerId;
      updateHour = getTimer?.hour;
      updateMinute = getTimer?.minute;
      updateSecond = getTimer?.second;
      audioData.forEach((item) => {
        if (item.audioId === item?.sound) {
          setSound(item.track);
        }
      });
      setTitle(getTimer?.title);
      setOnZero(getTimer?.onzero);
      setVolume(getTimer?.volume);
      setFlag(true);
    });


    setIsInterVal(
      setInterval(() => {
        setTimer(updateHour, updateMinute, updateSecond);
      }, 1000)
    );
    getTimer.forEach((item) => {
      if (item.timerId === timerId) {
        item.timeoutId = isInaterval;
      }
    });
    localStorage.setItem("timer", JSON.stringify(getTimer));
  };

  const stop = () => {
    const getTimer = JSON.parse(localStorage.getItem("timer")) || [];
    if (getTimer?.day) {
      clearInterval(dateIntval);
      setFlag(true);

      // const obj = {
      //   dateTime: new Date(getTimer?.dateTime),
      //   day: updateDateTime,
      //   hour: updateHour,
      //   minute: updateMinute,
      //   second: updateSecond,
      //   sound: getTimer?.sound,
      //   title: getTimer?.title,
      //   onzero: getTimer?.onzero,
      //   volume: getTimer?.volume,
      //   // isInaterval: clearInterval(getTimer?.isInaterval),
      //   // flag: true,
      // };
      localStorage.setItem("timer", JSON.stringify(obj));
    } else {
      getTimer.forEach((item) => {
        clearInterval(isInaterval);
        setFlag(true);
        item.hour = updateHour,
          item.minute = updateMinute,
          item.second = updateSecond,
          item.sound = sound,
          item.title = title,
          item.onzero = onZero,
          item.volume = volume,
          item.timeoutId = timeoutId,
          localStorage.setItem("timer", JSON.stringify(getTimer));
      });
      setIsResume(true);
    }
  };

  const Reset = () => {
    const getTimer = JSON.parse(localStorage.getItem("timer")) || [];
    if (getTimer?.day) {
      setFlag(false);
      clearInterval(dateIntval);
      // const obj = {
      //   day: setDateTimer(0),
      //   hour: setTimerHour(0),
      //   minute: setTimerMinute(0),
      //   second: setTimerSecond(0),
      //   sound: "getTimer?.sound",
      //   title: "",
      //   onzero: 0,
      //   volume: "getTimer?.volume",
      // };
      // localStorage.setItem("timer", JSON.stringify(obj));
    } else {
      debugger;
      clearInterval(isInaterval);
      setFlag(false);
      setTimerHour(0);
      setTimerMinute(0);
      setTimerSecond(0);
      setTitle("");
      setOnZero("stoptimer");
      debugger;
    }
  };

  const resume = () => {
    debugger;
    setFlag(false);
    setIsResume(false);
    const getTimer = JSON.parse(localStorage.getItem("timer")) || [];
    debugger;
    if (getTimer?.day) {
      getDateTimer();
    } else {
      getTimers();
      debugger;
    }
  };

  const flagSet = () => {
    setFlag(true);
    setIsResume(false);
  };

  const handleSpecificSecond = (timer) => {
    let specificSecondData = JSON.parse(localStorage.getItem("timer")) || [];

    const payload = {
      hour: updateHour || 0,
      minute: updateMinute || 0,
      second: timer / 1000,
      title: title,
      sound: sound,
      volum: volume,
      onzero: onZero,
    };
    specificSecondData.push(payload);
    localStorage.setItem("timer", JSON.stringify(specificSecondData));
    // setFlag(false);
    // flagSet();
    getTimers();
    setTimer(updateHour, updateMinute, updateSecond);
    count();
  };

  const handleSpecificMinute = (minute) => {
    if (minute < Date.now()) {
      const data = new Date(minute);
      const payload = {
        hour: updateHour || 0,
        minute: data.getMinutes(),
        second: data.getSeconds() || 0,
        title: title,
        sound: sound,
        volum: volume,
        onzero: onZero,
      };
      localStorage.setItem("timer", JSON.stringify(payload));
      flagSet();
      getTimers();
      setTimer(updateHour, updateMinute, updateSecond);
      count();
    }
  };

  const handleSpecificHour = (hour) => {
    if (hour < Date.now()) {
      const data = new Date(hour);
      const payload = {
        hour: data.getHours(),
        minute: data.getMinutes(),
        second: data.getSeconds(),
        title: title,
        sound: sound,
        volum: volume,
        onzero: onZero,
      };
      localStorage.setItem("timer", JSON.stringify(payload));
      flagSet();
      getTimers();
      setTimer(updateHour, updateMinute, updateSecond);
      count();
    }
  };

  const handleEdit = () => {
    setIsEdit(true);
    const getItem = JSON.parse(localStorage.getItem("timer")) || [];
    setTimerHour(methods.setValue("hour", getItem.hour));
    setTimerMinute(methods.setValue("minute", getItem.minute));
    methods.setValue("second", getItem.second);
    methods.setValue("sound", getItem.sound);
    methods.setValue("volume", getItem.volume);
    methods.setValue("onzero", getItem.onzero);
    methods.setValue("title", getItem.title);
    setShowModal(true);
  };
  const handleEditAlarm = () => {
    const allTimer = JSON.parse(localStorage.getItem("timer")) || [];
    let editedTimer = {
      hour: allTimer?.hour,
      minute: allTimer?.minute,
      second: allTimer?.second,
      sound: allTimer?.sound,
      title: allTimer?.title,
      onzero: allTimer?.onzero,
      volume: allTimer?.volume,
    };
    localStorage.setItem("Alarms", JSON.stringify(editedTimer));
    getTimers();
    TimerModalClose();
    setFlag(!flag);
    setIsEdit(false);
  };

  //2. Count till (from) date and time
  const setDateTimer = (date) => {
    if (date !== 0) {
      updateDateTime = date;
    }
    setIsFlag(true);
    const startDate = new Date();
    var endDate = new Date(date.dateTime);
    const timeRemaining = endDate.getTime() - startDate.getTime();
    // if (endDate < startDate) {
    //   debugger
    //   alert("please select proper date");
    //   // setIsTimer(false);
    //   debugger
    // }
    if (timeRemaining > 0) {
      const start_date = new Date(startDate);
      const end_date = new Date(endDate);
      const start_millis = start_date?.getTime();
      const end_millis = end_date?.getTime();
      const old_sec = start_millis / 1000;
      const current_sec = end_millis / 1000;
      let seconds = current_sec - old_sec;
      let days = Math.floor(seconds / (24 * 60 * 60));
      seconds -= days * 24 * 60 * 60;
      updateDateTime = Math.abs(days);
      let hours = Math.floor(seconds / (60 * 60));
      seconds -= hours * 60 * 60;
      updateHour = Math.abs(hours);
      let minutes = Math.floor(seconds / 60);
      seconds -= minutes * 60;
      updateMinute = Math.abs(minutes);
      updateSecond = Math.floor(Math.abs(seconds));
      setTimerDays(updateDateTime);
      setTimerHour(updateHour);
      setTimerMinute(updateMinute);
      setTimerSecond(updateSecond);

      const getTimer = JSON.parse(localStorage.getItem("timer")) || [];
      const obj = {
        dateTime: new Date(getTimer?.dateTime),
        day: updateDateTime,
        hour: updateHour,
        minute: updateMinute,
        second: updateSecond,
        sound: getTimer?.sound,
        title: getTimer?.title,
        // flag:false
      };
      localStorage.setItem("timer", JSON.stringify(obj));
      count();
    }
  };

  // /Count till (from) date and time
  const getDateTimer = () => {
    const getTimer = JSON.parse(localStorage.getItem("timer")) || [];
    updateDateTime = getTimer?.dateTime;
    audioData.forEach((item) => {
      if (item.audioId === getTimer?.sound) {
        setSound(item.track);
      }
    });
    setTitle(getTimer?.title);
    setVolume(getTimer?.volume);
    if (flag === false) {
      debugger;
      stop();
      debugger;
    }
    // setFlag(true);
    setDateIntval(
      setInterval(() => {
        setDateTimer(getTimer);
      }, 1000)
    );
  };

  useEffect(() => {}, [isInaterval]);
  useEffect(() => {
    const reRenderTimer = () => {
      if (JSON.parse(localStorage.getItem("timer")) === null) {
        setFlag(false);
      }
      //else if (JSON.parse(localStorage.getItem("timer"))){
      //     getTimers();
      // }
    };
    return reRenderTimer();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DisplayTimer
        title={title}
        timerDay={updateDateTime ? updateDateTime : "0"}
        timerHour={updateHour}
        timerMinute={updateMinute}
        timerSecond={updateSecond}
        isFlag={isFlag}
      />
      <div style={{ marginRight: "2%" }}>
        <BtnTimer
          setShowModal={setShowModal}
          flag={flag}
          stop={stop}
          Reset={Reset}
          resume={resume}
          isResume={isResume}
          isEdit={isEdit}
          handleEdit={handleEdit}
        />
        <audio src={sound} ref={timerAudioRef} />
        <SetTimerModal
          isEdit={isEdit}
          showModal={showModal}
          TimerModalClose={TimerModalClose}
          getTimers={getTimers}
          getDateTimer={getDateTimer}
          flag={flag}
          FalgSet={flagSet}
          sound={sound}
          ref={timerAudioRef}
          onZero={onZero}
          handleEditAlarm={handleEditAlarm}
          methods={methods}
          title={title}
          isInaterval={isInaterval}
        />
        <DisplayTimerModal
          timerModal={timerModal}
          handleCloseRing={handleCloseRing}
          title={title}
          setFlag={setFlag}
          methods={methods}
          timerId={timerId}
        />
      </div>
      <Divider />
      <SpecificSecond handleSpecificSecond={handleSpecificSecond} />
      <Divider />
      <SpecificMinute handleSpecificMinute={handleSpecificMinute} />
      <Divider />
      <SpecificTimerHour handleSpecificHpour={handleSpecificHour} />
      <Divider />
      <div>
        <CSVLink data={data} style={{ width: "100%", textDecoration: "none" }}>
          <button className={styles.csv_button}>
            <BiExport />
            Export To CSV
          </button>
        </CSVLink>
        <div className={styles.timer_info}>{data}</div>
        <div className={styles.timer_info_sub}>{data}</div>
      </div>
    </div>
  );
}

export default Timer;
