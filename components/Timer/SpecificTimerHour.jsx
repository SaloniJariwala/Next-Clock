import React from 'react'
import styles from "../../styles/Timer.module.css";
import  {specificTimerHour}  from '../../data/specificTimerHour';
import timer from "../../public/Assets/svg/timer.svg";
import Image from 'next/image';
import { Divider } from 'antd';

const SpecificTimerHour=({handleSpecificHpour})=> {
  return (
    <div className={styles.specific_main}>
    <div className={styles.minute_title}>Quick Setup Hours Timers</div>
        <div className={styles.minute_button}>
        {
                specificTimerHour.map((item)=>(
                    <button className={styles.btn_second} key={item.value} onClick={()=>handleSpecificHpour(item.value)}>
                         <span><Image src={timer}  style={{display:"flex"}}  alt={timer}/>
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

export default SpecificTimerHour