import React from "react";
import styles from "../../styles/StopWatch.module.css"
import { BsSkipStart } from "react-icons/bs";
import { MdOutlineRestartAlt, MdPause, MdTimelapse } from "react-icons/md";
import Image from "next/image";
import Play from "../../public/Assets/svg/play.svg";

const BtnStopWatch = ({ isActive, ispaused, handleStart, Resume,stop, handleReset, lap }) => {
    return (
        <>
            <div>
                {!isActive ? (
                    <button
                        className={styles.btn}
                        onClick={handleStart}
                    >
                        <Image src={Play} alt='svg' height={15} width={15} />
                        <span>Start</span>
                    </button>
                ) : (
                    <div className={styles.btnBar}>
                        {ispaused ? (
                            <>
                                <button className={styles.btn} onClick={Resume}>
                                    <BsSkipStart />
                                    Resume
                                </button>
                            </>
                        ) : (
                            <>
                            <button className={styles.btn}
                            onClick={lap}>
                            <MdTimelapse />
                            Lap
                        </button>

                        <button className={styles.btn}
                        onClick={stop}>
                        <MdPause />
                        stop
                    </button>
                            </>
                        )}
                        <button className={styles.btn}
                            onClick={handleReset}>
                            <MdOutlineRestartAlt />
                            Reset
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default BtnStopWatch;
