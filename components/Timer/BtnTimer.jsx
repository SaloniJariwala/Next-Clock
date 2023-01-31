import React from "react";
import {BsSkipStart} from "react-icons/bs";
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
            <div>
                {!flag ? (
                    <button
                        className={styles.btnStart}
                        onClick={() => setShowModal(true)}
                    >
                        <BsSkipStart/>
                        Start
                    </button>
                ) : (
                    <div className={styles.controls}>
                        {isResume ? (
                            <div>
                                <button className={styles.btnStart} onClick={resume}>
                                    <BsSkipStart/>
                                    Resume
                                </button>
                            </div>
                        ) : (
                            <div className={styles.controls}>
                                <button className={styles.btnStart} onClick={handleEdit}>
                                    <BsSkipStart/>
                                    Edit
                                </button>

                                <button className={styles.btnStart} onClick={stop}>
                                    <BsSkipStart/>
                                    stop
                                </button>
                            </div>
                        )}
                        <button className={styles.btnStart} onClick={Reset}>
                            <BsSkipStart/>
                            Reset
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default BtnTimer;
