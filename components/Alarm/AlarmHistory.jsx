import React, {useEffect, useState} from "react";
import { Table } from "react-bootstrap";
import Image from "next/image";
import {getCountryFlag} from "../../utils/getCountryFlag";
import styles from "../../styles/Alarm.module.css";
import {Popconfirm} from "antd";
import {
    MdEdit,
    MdOutlineDeleteOutline,
    MdSettings,
    MdPause,
    MdPlayArrow,
} from "react-icons/md";
import CSV from "../../public/Assets/svg/csv.svg";
import {CSVLink} from "react-csv";
import {getTime} from "../../utils/getTime";
import {audioData} from "../../data/audios";

const AlarmHistory = ({
    pastAlarms,
    handleEdit,
    handlePauseAlarm,
    deleteAlarm
}) => {

    const [showBtn, setShowBtn] = useState(false);
    const [alarmId, setAlarmId] = useState();
    const [csvData, setCsvData] = useState([]);

    useEffect(() => {
        let array = [];
        pastAlarms.forEach((item) => {
            let obj = {
                alarmId: item.alarmId,
                timeoutId: item.timeoutId,
                countryTime: getTime(item.countryTimestamp),
                alarmTime: getTime(item.alarmTimestamp),
                originalTime: getTime(item.orgTimestamp),
                startedTime: getTime(item.startedTime),
                stoppedTime: getTime(item.stopTime),
                isAlarmPause: item.isAlarmPause,
                title: item.title,
                note: item.note,
                country: item.country.value,
                alarmVolume: item.alarmVolume,
            };
            audioData.forEach((i) => {
                if(i.audioId === item.alarmTune) {
                    obj ={ ...obj, alarmTune: i.english};
                }
            });
            array.push(obj);
        });
        setCsvData(array);
    }, [pastAlarms]);

    const handleAdditionBtn = (id) => {
        setAlarmId(id);
        setShowBtn(!showBtn);
    };

    const confirm = (alarmId, timeoutId) => {
        deleteAlarm(alarmId, timeoutId);
    };

    const handlePlayPause = (item) => {
        handlePauseAlarm(item);
        setShowBtn(!showBtn);
    };

    const handleEditing = (id) => {
        handleEdit(id);
        setShowBtn(!showBtn);
    };

    return (
        <div className={styles.historyOuter}>
            <Table bordered align='center' className={styles.table}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Country</th>
                        <th>Time</th>
                        <th>Started</th>
                        <th>Stopped</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {pastAlarms?.map((item, index) => (
                    <tr key={index}>
                        <td>{item.title}</td>
                        <td><Image src={getCountryFlag(item?.country.countryName)} alt={'flag'} height={30} width={30} /></td>
                        <td>{new Date(item?.orgTimestamp).toLocaleString('en-US',
                            { hour: 'numeric', minute: 'numeric', hour12: true })}</td>
                        <td>
                            <>{`${new Date(item.startedTime).toLocaleDateString()} - 
                            ${new Date(item?.startedTime).toLocaleString('en-US', 
                            { hour: 'numeric', minute: 'numeric', hour12: true })}`}</>
                        </td>
                        <td>
                            <>{`${new Date(item.stopTime).toLocaleDateString()} - 
                             ${new Date(item?.stopTime).toLocaleString('en-US',
                                { hour: 'numeric', minute: 'numeric', hour12: true })}`}</>
                        </td>
                        <td>
                            <div className={styles.outerSetting}>
                                <div className={styles.btnbar} style={{ marginTop: 'unset' }}>
                                    <button className={styles.btn} onClick={() => handleAdditionBtn(item.alarmId)}><MdSettings fill='grey' /></button>
                                    <Popconfirm
                                        title="Delete Alarm"
                                        description="Are you sure to delete this alarm?"
                                        onConfirm={() => confirm(item.alarmId, item.timeoutId)}
                                        onCancel={() => { return }}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <button className={styles.btn}><MdOutlineDeleteOutline fill='red' /></button>
                                    </Popconfirm>
                                </div>
                                {showBtn && alarmId === item.alarmId && (
                                    <>
                                        <button className={styles.editBtn} onClick={() => handleEditing(item.alarmId)}><MdEdit fill='grey' /></button>
                                        <button className={styles.playPauseBtn} onClick={() => handlePlayPause(item)}>
                                            {item.isAlarmPause ?
                                                <MdPause fill='#112466' /> :
                                                <MdPlayArrow fill='#112466' />
                                            }
                                        </button>
                                    </>
                                )}
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <CSVLink data={csvData} style={{ textDecoration: 'none' }}>
                <button className={styles.exportBtn}>
                    <Image src={CSV} alt={'CSV'} height={40} width={40} />
                    Export to CSV
                </button>
            </CSVLink>
        </div>
    );
};

export default AlarmHistory;