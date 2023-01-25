import React, {useEffect, useState} from "react";
import styles from "../../styles/Time.module.css";
import {Divider, Popconfirm} from "antd";
import Image from "next/image";
import {getCountryNameFromTimeZone} from "../../utils/getCountryNameFromTimeZone";
import {getCountryFlag} from "../../utils/getCountryFlag";
import {
    MdEdit,
    MdOutlineDeleteOutline
} from "react-icons/md";
import i18n from "../../i18n";

const ClockList = ({
    timezone,
    selected,
    handleSelected,
    handleEdit,
    handleDelete
}) => {

    const [currentTime, setCurrentTime] = useState();
    const [country, setCountry] = useState();

    const updateTime = () => {
        const d = new Date();
        const format = localStorage.getItem('format');
        if(format === '24') {
            setCurrentTime(d.toLocaleString('en-US', { timeZone: timezone.name, hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false }));
        } else {
            setCurrentTime(d.toLocaleString('en-US', { timeZone: timezone.name, hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }));
        }
    };

    useEffect(() => {
        const getCountry = async () => {
            const con = await getCountryNameFromTimeZone(timezone.name);
            setCountry(con);
        };
        getCountry();
    }, []);

    useEffect(() => {
        updateTime();
        setInterval(updateTime, 1000);
        // eslint-disable-next-line
    }, []);

    const handleEditing = (id) => {
          handleEdit(id);
    };

    return (
        <div
            onClick={() => handleSelected(timezone._id)}
            className={selected === timezone._id ? styles.selected : styles.timeCard}
        >
            <div className={styles.country}>
                <Image src={getCountryFlag(country)} alt={'flag'} height={40} width={40} />
                <span className={styles.cardDate}>{country}</span>
                <span className={styles.cardDate}>{timezone.city}</span>
            </div>
            <div className={styles.divider}>
                <Divider style={{ margin: "unset" }} />
            </div>
            <span className={styles.dateDiv}>{currentTime}</span>
            <div className={styles.divider}>
                <Divider style={{ margin: "unset" }} />
            </div>
            <div className={styles.outerSetting}>
                <div className={styles.btnbar}>
                    <button className={styles.btn} onClick={() => handleEditing(timezone._id)}><MdEdit fill='grey' /></button>
                    <Popconfirm
                        title={i18n.t('delete_title')}
                        description={i18n.t('delete_desc')}
                        onConfirm={() => handleDelete(timezone._id)}
                        onCancel={() => { return }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <button className={styles.btn}><MdOutlineDeleteOutline fill='red' /></button>
                    </Popconfirm>
                </div>
            </div>
        </div>
    );
};

export default ClockList;