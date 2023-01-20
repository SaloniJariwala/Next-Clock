import React from "react";
import { BsSkipStart } from "react-icons/bs";
import styles from "../../styles/Timer.module.css";
import SetTimerModal from "./setTimerModal";

const BtnTimer = ({
  setShowModal,
  flag,
  stop,
  Reset,
  resume,
  isResume,
  handleEdit,
  status,
}) => {
  return (
    <>
      <div className={styles.display_timer_button}>
        {!flag ? (
          <button
            className={styles.button_start}
            onClick={() => setShowModal(true)}
          >
            <BsSkipStart />
            Start
          </button>
        ) : (
          <>
            {isResume ? (
              <>
                <button className={styles.button_start} onClick={resume}>
                  <BsSkipStart />
                  Resume
                </button>
              </>
            ) : (
              <>
                <button className={styles.button_start} onClick={handleEdit}>
                  <BsSkipStart />
                  Edit
                </button>

                <button className={styles.btn_stop} onClick={stop}>
                  <BsSkipStart />
                  stop
                </button>
              </>
            )}
            <button className={styles.btn_stop} onClick={Reset}>
              <BsSkipStart />
              Reset
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default BtnTimer;
