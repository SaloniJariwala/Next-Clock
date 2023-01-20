import { Button } from "antd";
import React from "react";
import { MdPlayCircleOutline } from "react-icons/md";
import styles from "../../styles/Alarm.module.css";
const TimerModalButton = ({ methods ,isEdit,onTest}) => {
  const { control } = methods;

  return (
    <div>
      <div className={styles.row}>
        <div className={styles.btnCol}>
          <Button className={styles.footerBtn} onClick={onTest}>
            <MdPlayCircleOutline fill="#112466" />
            Test
          </Button>
          <button type="submit" className={styles.footerBtn}>{isEdit? 'Edit Timer' :'Start Timer'}</button>
        </div>
      </div>
    </div>
  );
};

export default TimerModalButton;
