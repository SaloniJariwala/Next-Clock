import React from 'react';
import styles from "../../styles/StopWatch.module.css";

const DisplayStopWatch = (props) => {

    return (
        <div className={styles.displayTime}>
            <span>{props.msToTime(props.time)}</span>
        </div>
    )
}

export default DisplayStopWatch
