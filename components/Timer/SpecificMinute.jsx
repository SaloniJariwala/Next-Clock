import React from 'react'
import styles from "../../styles/Timer.module.css";
import { specificTimerMinute } from '../../data/specificTimerMinute';
import timer from "../../public/Assets/svg/timer.svg";
import Image from 'next/image';
import { Divider } from 'antd';

function SpecificMinute({handleSpecificMinute}) {
  return (
    <div className={styles.specific_main}>
    <div className={styles.minute_title}>Quick Setup Minute Timers</div>
        <div className={styles.minute_button}>
        {
                specificTimerMinute.map((item)=>(
                    <button className={styles.btn_second} key={item.value} onClick={()=>handleSpecificMinute(item.value)}>
                         <span><Image src={timer}  style={{display:"flex"}} alt={timer}/>
                        </span> 
                         <Divider type="vertical" />
                        
                        <p className={styles.btn_title}>{item.title}</p>
                        </button>

                ))
            }
        </div>
</div>
)
}
 

export default SpecificMinute