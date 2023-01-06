import React from "react";
import styles from "../../styles/StopWatch.module.css";
import { BsSkipStart } from "react-icons/bs";
import { MdOutlineRestartAlt, MdPause, MdTimelapse } from "react-icons/md";
import { GrResume } from "react-icons/gr";

const BtnStopWatch = (props) => {
    return (
        <>
            <div className={styles.stopwatch_button}>
                {props.status === 0 && (
                    <>
                        <div>
                            <button
                                className={styles.btn_start}
                                onClick={props.startStopWatch}
                            >
                                <BsSkipStart />
                                Start
                            </button>
                        </div>
                        <div>
                            <button className={styles.btn_reset} 
                                    onClick={props.reset}>
                                <MdOutlineRestartAlt />
                                Reset
                            </button>
                        </div>
                    </>
                )}

                {props.status === 1 && (
                    <>
                        <div>
                            <button className={styles.btn_start} 
                                    onClick={props.stop}>
                                <MdPause />
                                stop
                            </button>
                        </div>
                        <div>
                            <button className={styles.btn_reset} 
                                    onClick={props.lap}>
                                <MdTimelapse />
                                Lap
                            </button>
                        </div>
                    </>
                )}

                {props.status === 2 && (
                    <>
                        <div>
                            <button className={styles.btn_start} 
                                    onClick={props.resume}>
                                <GrResume />
                                Resume
                            </button>
                        </div>
                        <div>
                            <button className={styles.btn_reset} 
                                    onClick={props.reset}>
                                <MdOutlineRestartAlt />
                                Reset
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default BtnStopWatch;
