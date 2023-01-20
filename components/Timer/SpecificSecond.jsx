import React from 'react'
import styles from "../../styles/Timer.module.css";
import  {specificTimerSecond}  from '../../data/specificTimerSecond';
import timer from "../../public/Assets/svg/timer.svg";
import Image from 'next/image';
import { Divider } from 'antd';
const SpecificSecond=({handleSpecificSecond})=> {
  return (
    <div className={styles.specific_main}>
        <div className={styles.second_text}>Quick Setup Seconds Timers</div>
        <div className={styles.btn_frame}>
            {
                specificTimerSecond.map((item)=>(
                    <button className={styles.btn_second} key={item.value} onClick={()=>handleSpecificSecond(item.value)}>
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

export default SpecificSecond