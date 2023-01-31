import React, {useState} from "react";
import {Button, Divider} from "antd";
import ReminderClock from "./ReminderClock";
import styles from '../../styles/Reminder.module.css';
import SetReminder from "./SetReminderModel";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { notifyUser } from "../../utils/notification";
import { useRef } from "react";
import defaultSound from "../../Assets/audios/alarm.mp3"
import { audioData } from "../../data/audios";

const Reminder = ({ categoryData }) => {
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [currentReminder, setCurrentReminder] = useState();
    const [reminderAudio, setReminderAudio] = useState(defaultSound);
    const reminderAudioRef = useRef();

    const play = () => {
        reminderAudioRef.current?.play();
        reminderAudioRef.current.loop = true;
    };

    const pause = () => {
        reminderAudioRef.current.pause();
    };

   
    const closeModal = () => {
        setShowModal(false);
    };
    
    const storeReminderData=(payload)=>{
        const getReminder=JSON.parse(localStorage.getItem('reminder')) || [];
        const reminderData={
            reminderId:uuidv4(),
            timeStamp:new Date(payload.dateTime).getTime(),
            reminderNote:payload.reminderNote,
            reminderTitle:payload.reminderTitle,
            reminderCategory:payload.category,
            reminderSound:payload.sound,
            reminderVolume:payload.volume
        }
        getReminder.push(reminderData);
        localStorage.setItem('reminder',JSON.stringify(getReminder));
    }

    const callToReminder=()=>{
        const allReminder=JSON.parse(localStorage.getItem('reminder')) || [];
        const currentTimeStamp=Date.now();
        let newList=allReminder.filter((item)=>item.timeStamp > currentTimeStamp);
        let nearestReminder;
        if(newList.length>1){
            for(let i=0;i<newList.length;i++){
                for(let j=0;j<=i;j++){
                    if(newList[j].timeStamp>=newList[i].timeStamp){
                        nearestReminder=newList[j];
                    }
                }
            }
        }else{
            nearestReminder=newList[0];
        }
        const currTimeStamp=new Date();
        let diff;
        diff=nearestReminder?.timeStamp-currTimeStamp;
        if (diff >= 0) {
            const id = setTimeout(() => {
                setCurrentReminder(nearestReminder);
                audioData.forEach((item) => {
                    if (item.audioId === nearestReminder.sound) {
                        setReminderAudio(item.track);
                    }
                })
                // play();
                notifyUser(nearestReminder?.title, nearestReminder?.note);
                console.log("time")
                // setshowDisplayReminder(true);
            }, diff);
            const allReminders = JSON.parse(localStorage.getItem("reminder")) || [];
            allReminders.forEach((item) => {
                if (item.timestamp === nearestReminder.timestamp) {
                    item.timeoutId = id;
                }
            });
            localStorage.setItem("reminder", JSON.stringify(allReminders));
        }
    }
    return (
        <>
            <ReminderClock />
            <Button className={styles.setBtn} onClick={() => setShowModal(true)}>Set Reminder</Button>
            <Divider className={styles.dividerBar} />
            <SetReminder
                close={closeModal}
                isEdit={isEdit}
                show={showModal}
                categoryData={categoryData}
                storeReminderData={storeReminderData}
                callToReminder={callToReminder}
                />
        </>
    );
};

export default Reminder;