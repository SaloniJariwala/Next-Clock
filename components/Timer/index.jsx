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
import { v4 as uuidv4 } from "uuid";
import TimerHistory from "./TimerHistory";
import { IoGitMerge } from "react-icons/io5";

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
  const [id, setId] = useState("0");
  const [isDataFlag, setIsDataFlag] = useState(false);
  const [ringData, setRingData] = useState([]);
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
    debugger;
    const getItem = JSON.parse(localStorage.getItem("timer")) || [];
    debugger;
    getItem.forEach((item) => {
      debugger;
      if (item.onzero === "stoptimer") {
        debugger;
        debugger;
        setTimerSecond(0);
        setTimerMinute(0);
        setTimerHour(0);
        setFlag(false);
      } else {
        debugger;
        getTimers();
        debugger;
        setIsResume(false);
        debugger;
      }
    });
    let stopTime = new Date();
    getItem.forEach((item) => {
      if (item.timerId) {
        item.stopTime = stopTime;
      }
    });
    localStorage.setItem("timer", JSON.stringify(getItem));
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

    let getTime = JSON.parse(localStorage.getItem("timer"));
    getTime.forEach((item) => {
      setId(item.timerId);
      if (updateHour === 0 && updateMinute === 0 && updateSecond === 0) {
        setId("");
        setFlag(false);
      }
    });
    setTimerSecond(updateSecond);
    setTimerMinute(updateMinute);
    setTimerHour(updateHour);
    setTitle(title);
    count();
  };

  function count() {
    debugger;
    const timerHistory = JSON.parse(localStorage.getItem("timer")) || [];
    debugger;
    if (
      updateDateTime === 0 &&
      updateHour === 0 &&
      updateMinute === 0 &&
      updateSecond === 0
    ) {
      timerHistory.forEach((item) => {
        if (item.timerId === timerId) {
          playAudio();
          notifyUser(item?.title);
          setTimeModal(true);
          setRingData(item);
        }
      });

      // const getHistory = JSON.parse(localStorage.getItem("his")) || [];
      // const timer = JSON.parse(localStorage.getItem("timer"));
      // getHistory.push(timer);
      // localStorage.setItem("timer", JSON.stringify(getHistory));
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
    debugger;
    const getTimer = JSON.parse(localStorage.getItem("timer")) || [];
    debugger;
    let startDate = new Date();
    let stopTime = new Date();
    debugger;
    getTimer.forEach((item) => {
      startDate = item?.startDate;
      stopTime = item?.stopTime;
      timerId = item?.timerId;
      updateHour = item?.hour;
      updateMinute = item?.minute;
      updateSecond = item?.second;
      audioData.forEach((audio) => {
        if (audio.audioId === item?.sound) {
          setSound(audio.track);
        }
      });
      setId(item?.timerId);
      setTitle(item?.title);
      setOnZero(item?.onzero);
      setVolume(item?.volume);
    });
    setFlag(true);

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
    debugger;
    const getTimer = JSON.parse(localStorage.getItem("timer")) || [];
    console.log(getTimer);
    debugger;
    let startDate = new Date();
    let stopTime = new Date();
    debugger;
    getTimer.forEach((item) => {
      if (item?.dateTime) {
        debugger;
        clearInterval(dateIntval);
        debugger;
        setFlag(true);
        debugger;
        item.startDate = startDate;
        item.stopTime = stopTime;
        item.dateTime,
          (item.day = updateDateTime),
          (item.hour = updateHour),
          (item.minute = updateMinute),
          (item.second = updateSecond),
          item.sound,
          item.title,
          item.volume,
          item.timeoutId;

        localStorage.setItem("timer", JSON.stringify(getTimer));
      } else {
        debugger;
        // if (item.timerId === timerId) {
        clearInterval(isInaterval);
        setFlag(true);
        (item.startDate = startDate), (item.stopTime = stopTime);
        (item.hour = updateHour),
          (item.minute = updateMinute),
          (item.second = updateSecond),
          item.sound,
          item.title,
          item.onzero,
          item.volume,
          item.timeoutId;
        localStorage.setItem("timer", JSON.stringify(getTimer));
        // }
      }
    });

    setIsResume(true);
  };

  const Reset = () => {
    const getTimer = JSON.parse(localStorage.getItem("timer")) || [];
    getTimer.forEach((item) => {
      if (item?.dateTime) {
        if (item.timerId === timerId) {
          clearInterval(dateIntval);
          setFlag(false);
          setTimerDays(0);
          setTimerHour(0);
          setTimerMinute(0);
          setTimerSecond(0);
          setTitle("");
          setOnZero("stoptimer");
        }
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
    });
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
    let startDate = new Date();
    const payload = {
      timerId: uuidv4(),
      timeoutId: isInaterval,
      startDate: startDate,
      stopTime: "",
      hour: updateHour || 0,
      minute: updateMinute || 0,
      second: timer / 1000 || 0,
      title: timer / 1000 + " " + "second " || 0,
      sound: sound,
      volum: volume,
      onzero: onZero,
    };
    specificSecondData.push(payload);
    localStorage.setItem("timer", JSON.stringify(specificSecondData));
    setFlag(false);
    flagSet();
    getTimers();
    setTimer(updateHour, updateMinute, updateSecond);
    count();
  };

  const handleSpecificMinute = (minute) => {
    let specificMinuteData = JSON.parse(localStorage.getItem("timer")) || [];
    let startDate = new Date();
    if (minute < Date.now()) {
      const data = new Date(minute);
      const payload = {
        timerId: uuidv4(),
        timeoutId: isInaterval,
        startDate: startDate,
        stopTime: "",
        hour: updateHour || 0,
        minute: data.getMinutes() || 0,
        second: data.getSeconds() || 0,
        title: data.getMinutes() + " " + "minute" || 0,
        sound: sound,
        volum: volume,
        onzero: onZero,
      };
      specificMinuteData.push(payload);
      localStorage.setItem("timer", JSON.stringify(specificMinuteData));
      flagSet();
      getTimers();
      setTimer(updateHour, updateMinute, updateSecond);
      count();
    }
  };

  const handleSpecificHour = (hour) => {
    let specificHourData = JSON.parse(localStorage.getItem("timer")) || [];
    let startDate = new Date();
    if (hour < Date.now()) {
      const data = new Date(hour);
      const payload = {
        timerId: uuidv4(),
        timeoutId: isInaterval,
        startDate: startDate,
        stopTime: "",
        hour: data.getHours(),
        minute: data.getMinutes(),
        second: data.getSeconds(),
        title: data.getHours() + " " + "Hours",
        sound: sound,
        volum: volume,
        onzero: onZero,
      };
      specificHourData.push(payload);
      localStorage.setItem("timer", JSON.stringify(specificHourData));
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
    date.forEach((item) => {
      if (item.timerId === timerId) {
        if (item.dateTime !== 0) {
          updateDateTime = item.dateTime;
        }
        setIsFlag(true);
        const startDate = new Date();
        var endDate = new Date(item.dateTime);
        // console.log(endDate,"::")
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
          setId(item.timerId);
          if (
            updateDateTime === 0 &&
            updateHour === 0 &&
            updateMinute === 0 &&
            updateSecond === 0
          ) {
            setId("");
            setFlag(false);
          }
          setTimerDays(updateDateTime);
          setTimerHour(updateHour);
          setTimerMinute(updateMinute);
          setTimerSecond(updateSecond);
        }
      }
    });
    count();
  };

  // /Count till (from) date and time
  const getDateTimer = () => {
    const getTimer = JSON.parse(localStorage.getItem("timer")) || [];
    getTimer.forEach((item) => {
      timerId = item?.timerId;
      item?.startDate;
      item?.dateTime;
      (item.day = new Date(item.dateTime).getDay()),
        (item.hour = new Date(item.dateTime).getHours()),
        (item.minute = new Date(item.dateTime).getMinutes()),
        (item.second = new Date(item.dateTime).getSeconds()),
        audioData.forEach((item) => {
          if (item.audioId === getTimer?.sound) {
            setSound(item.track);
          }
        });
      setTitle(item?.title);
      setVolume(item?.volume);
    });
    // setFlag(true);
    setDateIntval(
      setInterval(() => {
        setDateTimer(getTimer);
      }, 1000)
    );
    getTimer.forEach((item) => {
      if (item.timerId === timerId) {
        item.timeoutId = dateIntval;
      }
    });
    localStorage.setItem("timer", JSON.stringify(getTimer));
  };

  useEffect(() => {
    const reRenderTimer = () => {
      if (JSON.parse(localStorage.getItem("timer")) === null) {
        return setFlag(false);
      } else {
        //  return getTimers();
        // setFlag(true)
        // setIsResume(false);
        debugger;
      }
    };
    return reRenderTimer();
  }, []);

  const deleteTimer = (tid) => {
    const deleTimer = JSON.parse(localStorage.getItem("timer"));
    const delTimer = deleTimer.filter((item) => item?.timerId !== tid);
    localStorage.setItem("timer", JSON.stringify(delTimer));
    setIsDataFlag(!isDataFlag);
  };

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
        timerDay={updateDateTime}
        timerHour={timerHour}
        timerMinute={timerMinute}
        timerSecond={timerSecond}
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
          setFlag={setFlag}
          ringData={ringData}
        />
      </div>
      <Divider />
      <SpecificSecond handleSpecificSecond={handleSpecificSecond} />
      <Divider />
      <SpecificMinute handleSpecificMinute={handleSpecificMinute} />
      <Divider />
      <SpecificTimerHour handleSpecificHpour={handleSpecificHour} />
      <Divider />
      <TimerHistory deleteTimer={deleteTimer} isDataFlag={isDataFlag} />
      <div>
        <div className={styles.timer_info}>{data}</div>
        <div className={styles.timer_info_sub}>{data}</div>
      </div>
    </div>
  );
}

export default Timer;
