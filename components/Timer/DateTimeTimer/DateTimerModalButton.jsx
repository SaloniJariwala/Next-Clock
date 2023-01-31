import { Button } from "antd";
import React from "react";
import { MdPlayCircleOutline } from "react-icons/md";
import styles from "../../../styles/Alarm.module.css";

const DateTimerModalButton = ({ methods ,isEdit,onTest}) => {
  const { control } = methods;

  const a = 5 > 5 ? "Condition True" : "Condition false";

  return (
    <div>
      <div className={styles.row}>
        <div className={styles.btnCol}>
          <Button className={styles.setBtn} onClick={onTest}>
            <MdPlayCircleOutline fill="#112466" />
            Test
          </Button>
          <Button type="submit" className={styles.setBtn}>{isEdit? 'Edit Timer' :'Start Timer'}</Button>
        </div>
      </div>
    </div>
  );
};

export default DateTimerModalButton;
