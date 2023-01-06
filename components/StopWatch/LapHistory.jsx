import React, { useEffect, useState } from "react";
import styles from "../../styles/StopWatch.module.css";

const LapHistory = (lapTime) => {
  console.log(lapTime,":::");
  return (
    <div className={styles.lap_timing}>
      <div className={styles.lap_title}>LapHistory</div>
      <div>
      
        <table className={styles.lap_table}>
            <thead>
                <tr>
                <th className={styles.lap_table_th}>Time</th>
                <th className={styles.lap_table_th}>Total Time</th>
                </tr>
            </thead>
            <tbody>
                
                    {lapTime && lapTime.map((time)=>(
                       <tr>
                        <td className={styles.lap_table_td}>{time.minute}:{time.second}:{time.milisecond}</td>
                        <td className={styles.lap_table_td}>00:00:00</td>
                        </tr>
                    ))}
                
            </tbody>
        </table>
  
      </div>
    </div>
  );
};

export default LapHistory;
