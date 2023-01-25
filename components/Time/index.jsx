import React, {useEffect, useState} from "react";
import Clock from "./Clock";
import {Divider, Button} from "antd";
import ClockList from "./ClockList";
import styles from "../../styles/Time.module.css";
import AddModal from "./AddModal";

const Time = ({ timezoneData, countryData }) => {

    const [timezoneList, setTimezoneList] = useState([]);
    const [selected, setSelected] = useState(1);
    const [currentTimezone, setCurrentTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const [showAddModal, setShowAddModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedTimezone, setSelectedTimezone] = useState();
    const [flag, setFlag] = useState(false);

    const closeAddModal = () => {
        setShowAddModal(false);
    };

    useEffect(() => {
        let timezones = JSON.parse(localStorage.getItem('TimezoneList'));
        const current = timezones?.find((item) => item?.name === Intl.DateTimeFormat().resolvedOptions().timeZone);
        setSelected(current?._id);
        setCurrentTimezone(current?.name);
        setTimezoneList(timezones);
    }, [flag]);

    const handleSelected = (id) => {
        setSelected(id);
        const current = timezoneData?.find((item) => item._id === id);
        setCurrentTimezone(current?.name);
    };

    const settingCurrentTimezone = (timezone) => {
        setCurrentTimezone(timezone);
        const newTimezone = timezoneData.find((item) => item?.name === timezone);
        setSelected(newTimezone._id);
        const newList = [...timezoneList, newTimezone];
        setTimezoneList(newList.reverse());
        localStorage.setItem('TimezoneList', JSON.stringify(newList));
    };

    const handleEdit = (id) => {
        const timezoneList = JSON.parse(localStorage.getItem('TimezoneList'));
        const selected = timezoneList.find((item) => item._id === id);
        setCurrentTimezone(selected.name);
        setSelectedTimezone(selected);
        setIsEdit(true);
        setShowAddModal(true);
    };

    const handleEditing = (timezone) => {
        const newTimezone = timezoneData.find((item) => item?.name === timezone);
        const timezoneList = JSON.parse(localStorage.getItem('TimezoneList'));
        const index = timezoneList.findIndex((i) => i._id === selectedTimezone._id);
        if(index !== -1) {
            timezoneList[index] = newTimezone;
        }
        localStorage.setItem('TimezoneList', JSON.stringify(timezoneList));
        setIsEdit(false);
        setShowAddModal(false);
        setFlag(!flag);
    };

    const handleDelete = (id) => {
        const timezoneList = JSON.parse(localStorage.getItem('TimezoneList'));
        const filtered = timezoneList.filter((item) => item._id !== id);
        localStorage.setItem('TimezoneList', JSON.stringify(filtered));
        setFlag(!flag);
    };

    return (
        <>
            <Clock timezone={currentTimezone} />
            <Divider />
            <div className={styles.cardList}>
                {timezoneList?.map((item) => (
                    <ClockList
                        key={item._id}
                        timezone={item}
                        handleSelected={handleSelected}
                        handleEdit={handleEdit}
                        selected={selected}
                        handleDelete={handleDelete}
                    />
                ))}
            </div>
            <Button className={styles.setBtn} onClick={() => setShowAddModal(true)}>+ Add</Button>
            <AddModal
                show={showAddModal}
                close={closeAddModal}
                countryData={countryData}
                settingCurrentTimezone={settingCurrentTimezone}
                isEdit={isEdit}
                currentTimezone={selectedTimezone}
                handleEditing={handleEditing}
            />
        </>
    );
};

export default Time;