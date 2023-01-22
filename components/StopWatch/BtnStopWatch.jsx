import React from "react";
import styles from "../../styles/StopWatch.module.css"
import { BsSkipStart } from "react-icons/bs";
import { MdOutlineRestartAlt, MdPause, MdTimelapse } from "react-icons/md";
import { GrResume } from "react-icons/gr";

const BtnStopWatch = ({ isActive, ispaused, handleStart, Resume,stop, handleReset, lap }) => {
    return (
        <>
            <div className={styles.display_timer_button}>
                {!isActive ? (
                    <button
                        className={styles.btn_start}
                        onClick={handleStart}
                    >
                        <BsSkipStart />
                        Start
                    </button>
                ) : (
                    <>
                        {ispaused ? (
                            <>
                                <button className={styles.btn_start} onClick={Resume}>
                                    <BsSkipStart />
                                    Resume
                                </button>
                            </>
                        ) : (
                            <>
                            <button className={styles.btn_reset}
                            onClick={lap}>
                            <MdTimelapse />
                            Lap
                        </button>

                        <button className={styles.btn_start}
                        onClick={stop}>
                        <MdPause />
                        stop
                    </button>
                            </>
                        )}
                        <button className={styles.btn_reset}
                            onClick={handleReset}>
                            <MdOutlineRestartAlt />
                            Reset
                        </button>
                    </>
                )}
            </div>
        </>
    );
};

export default BtnStopWatch;
