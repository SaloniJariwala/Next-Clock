import React from 'react'
import styles from "../../styles/Timer.module.css";
import {specificTimerMinute} from '../../data/specificTimerMinute';
import timer from "../../public/Assets/svg/timer.svg";
import Image from 'next/image';
import {Divider} from 'antd';

function SpecificMinute({handleSpecificMinute}) {
    return (
        <div className={styles.specificSection}>
            <div className={styles.displayTitles}>Quick Setup Minute Timers</div>
            <div className={styles.btnBar}>
                {
                    specificTimerMinute.map((item) => (
                        <button className={styles.timeBtns} key={item.value}
                                onClick={() => handleSpecificMinute(item.value)}>
                            <Image src={timer} alt={timer} height={20} width={20}/>
                            <Divider type="vertical"/>
                            {item.title}
                        </button>

                    ))
                }
            </div>
        </div>
    )
}


export default SpecificMinute