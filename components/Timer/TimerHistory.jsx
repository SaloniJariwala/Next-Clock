import React, {useEffect} from "react";
import {useState} from "react";
import {Table} from "react-bootstrap";
import styles from "../../styles/Timer.module.css";
import {CSVLink} from "react-csv";
import {Popconfirm} from "antd";
import {MdOutlineDeleteOutline} from "react-icons/md";
import excelImage from "../../Assets/excel.svg"
import Image from "next/image";

function TimerHistory({deleteTimer, isDataFlag}) {
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
                display: 'flex',
                flexDirection: 'column',
                justifyContent: "center",
                alignItems: "center",
                width: '100%'
            }}
        >
            {time?.length > 0 && (<>
                <div className={styles.displayTitles}>Timer History</div>
                <Table bordered align="center" className={styles.table}>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Time</th>
                        <th>Started Time</th>
                        <th>Stopped Time</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {time?.map((timerHistory, index) => (
                        <tr key={index}>
                            <td>{timerHistory?.title}</td>
                            <td>{timerHistory?.hour}:{timerHistory?.minute}:{timerHistory?.second}</td>
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
                                    <button className={styles.btn}>
                                        <MdOutlineDeleteOutline fill="red" />
                                    </button>
                                </Popconfirm>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </>)}
            <div>
                <CSVLink
                  data={csvData}
                  style={{ width: "100%", textDecoration: "none" }}
                >
                  <button className={styles.exportBtn}>
                    <Image src={excelImage} alt={excelImage} height={20} width={20} />
                    Export To CSV
                  </button>
                </CSVLink>
            </div>
        </div>
    );
}

export default TimerHistory;
