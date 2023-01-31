import React from 'react'
import styles from "../../styles/Timer.module.css";
import {specificTimerSecond} from '../../data/specificTimerSecond';
import timer from "../../public/Assets/svg/timer.svg";
import Image from 'next/image';
import {Divider} from 'antd';

const SpecificSecond = ({handleSpecificSecond}) => {
    return (
        <div className={styles.specificSection}>
            <div className={styles.displayTitles}>Quick Setup Seconds Timers</div>
            <div className={styles.btnBar}>
                {
                    specificTimerSecond.map((item) => (
                        <button className={styles.timeBtns} key={item.value}
                                onClick={() => handleSpecificSecond(item.value)}>
                            <Image src={timer} alt={timer} height={20} width={20} />
                            <Divider type="vertical"/>
                            {item.title}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default SpecificSecond