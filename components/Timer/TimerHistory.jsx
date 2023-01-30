import { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import styles from "../../styles/Timer.module.css";
import { CSVLink } from "react-csv";
import { Popconfirm } from "antd";
import { MdOutlineDeleteOutline } from "react-icons/md";
import excelImage from "../../Assets/excel.svg"
import Image from "next/image";

function TimerHistory({ deleteTimer, isDataFlag }) {
  const [time, setTime] = useState([]);
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    const getTime = JSON.parse(localStorage.getItem("timer"));
    setTime(getTime);
    setCsvData(getTime);
  }, [isDataFlag]);

  const confirm = (tid) => {
    deleteTimer(tid);
  };
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        {time?.length > 0 && (<>
      <div className={styles.timer_history}>Timer History</div>
      <div className={styles.history_table}>
        <Table>
          <thead className={styles.table_row}>
            <tr className={styles.table_header}>
              <th>Title</th>
              <th>Time</th>
              <th>Started</th>
              <th>Stopped</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className={styles.table_row}>
            {time &&
              time?.map((timerHistory) => (
                <tr className={styles.table_header} key={timerHistory.timerId}>
                  <td>{timerHistory?.title}</td>
                  <td>
                    {timerHistory?.hour}:{timerHistory?.minute}:
                    {timerHistory?.second}
                  </td>
                  <td>
                    <>
                      {`${new Date(
                        timerHistory.startDate
                      ).toLocaleDateString()} - 
                                    ${new Date(
                                      timerHistory.startDate
                                    ).toLocaleString("en-US", {
                                      hour: "numeric",
                                      minute: "numeric",
                                      second: "numeric",
                                    })}`}
                    </>
                  </td>
                  <td>
                    <>{`${new Date(
                      timerHistory.stopTime
                    ).toLocaleDateString()} - 
                             ${new Date(timerHistory?.stopTime).toLocaleString(
                               "en-US",
                               {
                                 hour: "numeric",
                                 minute: "numeric",
                                 second: "numeric",
                               }
                             )}`}</>
                  </td>
                  <td>
                    <Popconfirm
                      title="Delete Timer History"
                      description="Are you sure to delete this timer?"
                      onConfirm={() => confirm(timerHistory.timerId)}
                      onCancel={() => {
                        return;
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <button className={styles.btn_delete}>
                        <MdOutlineDeleteOutline fill="red" className={styles.btn_svg_icon} />
                      </button>
                    </Popconfirm>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
        </>)}
      <div>
        <CSVLink
          data={csvData}
          style={{ width: "100%", textDecoration: "none" }}
        >
          <button className={styles.csv_button}>
            <Image src={excelImage} alt={excelImage} style={{width:"20px",height:"20px"}}/>
            Export To CSV
          </button>
        </CSVLink>
      </div>
    </div>
  );
}

export default TimerHistory;
