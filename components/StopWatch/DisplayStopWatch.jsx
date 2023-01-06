import React from 'react';
import styles from "../../styles/StopWatch.module.css";

const DisplayStopWatch = (props) => {
   
    return (
            <div className={styles.display_time}>
                <span>{(props.time.minute >= 10) ? props.time.minute : "0" + props.time.minute}:</span>
                <span>{(props.time.second >= 10) ? props.time.second : "0" + props.time.second}</span>
                <span className={styles.display_milisecond}>{(props.time.milisecond >= 10) ? props.time.milisecond : "0" + props.time.milisecond}</span>
            </div>
    )
}

export default DisplayStopWatch