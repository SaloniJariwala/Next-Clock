import React, {useState} from "react";
import {Button, Divider} from "antd";
import ReminderClock from "./ReminderClock";
import styles from '../../styles/Reminder.module.css';
import SetReminder from "./SetReminderModel";

const Reminder = () => {

    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <ReminderClock />
            <Button className={styles.setBtn} onClick={() => setShowModal(true)}>Set Reminder</Button>
            <Divider className={styles.dividerBar} />
            <SetReminder
                close={closeModal}
                isEdit={isEdit}
                show={showModal}
            />
        </>
    );
};

export default Reminder;