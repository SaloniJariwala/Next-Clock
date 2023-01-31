import React from 'react'
import styles from "../../styles/Timer.module.css";
import {specificTimerHour} from '../../data/specificTimerHour';
import timer from "../../public/Assets/svg/timer.svg";
import Image from 'next/image';
import {Divider} from 'antd';

const SpecificTimerHour = ({handleSpecificHpour}) => {
    return (
        <div className={styles.specificSection}>
            <div className={styles.displayTitles}>Quick Setup Hours Timers</div>
            <div className={styles.btnBar}>
                {
                    specificTimerHour.map((item) => (
                        <button className={styles.timeBtns} key={item.value}
                                onClick={() => handleSpecificHpour(item.value)}>
                            <Image src={timer} alt={timer} height={20} width={20}/>
                            <Divider type="vertical"/>
                            {item.title}
                        </button>

                    ))
                }
            </div>
        </div>
    )
};

export default SpecificTimerHour