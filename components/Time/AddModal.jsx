import React, {useEffect, useState} from "react";
import {Divider, Modal} from "antd";
import i18n from "../../i18n";
import styles from "../../styles/Time.module.css";
import axios from "axios";
import {GET_TIMEZONE_BY_COUNTRY} from "../../constant/endpoints";

const AddModal = ({
    show,
    close,
    countryData,
    settingCurrentTimezone,
    isEdit,
    currentTimezone,
    handleEditing
}) => {

    const [selectedCountryId, setSelectedCountryId] = useState();
    const [timezoneData, setTimezoneData] = useState([]);
    const [timezone, setTimezone] = useState();

    useEffect(() => {
        axios.get(`${GET_TIMEZONE_BY_COUNTRY}/${selectedCountryId}`)
            .then((response) => {
                setTimezoneData(response.data.filter((item) => item.name !== 'Asia/Calcutta'));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [selectedCountryId]);

    useEffect(() => {
        if(isEdit) {
            setSelectedCountryId(currentTimezone?.countryId);
            setTimezone(currentTimezone?.name);
        }
    }, [isEdit]);

    const handleClose = () => {
      setSelectedCountryId('default');
      setTimezone('default');
      close();
    };

    const handleOk = () => {
        if(isEdit) {
            handleEditing(timezone);
        } else {
            settingCurrentTimezone(timezone);
            handleClose();
        }
    };

    return (
        <Modal
            title={<span className={styles.modalTitle}>{isEdit ? i18n.t('edit_timezone') : i18n.t('add_timezone')}</span>}
            width={'fit-content'}
            open={show}
            onOk={handleOk}
            okText={isEdit ? i18n.t('edit') : i18n.t('add')}
            cancelText={i18n.t('cancel')}
            onCancel={handleClose}
        >
            <Divider style={{ margin: '15px 0' }} />
            <div className={styles.row}>
                <span className={styles.inputTitle}>{i18n.t('country')}</span>
                <select
                    className="form-select"
                    value={selectedCountryId}
                    onChange={(event) => setSelectedCountryId(event.target.value)}
                    style={{ color: '#112466' }}
                >
                    <option value="default">--{i18n.t('select_country')}--</option>
                    {countryData?.map((item, index) => (
                        <option
                            key={index}
                            value={item._id}
                        >
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className={styles.row}>
                <span className={styles.inputTitle}>{i18n.t('timezone')}</span>
                <select
                    className="form-select"
                    value={timezone}
                    onChange={(event) => setTimezone(event.target.value)}
                    style={{ color: '#112466' }}
                >
                    <option value="default">--{i18n.t('select_timezone')}--</option>
                    {timezoneData?.map((item, index) => (
                        <option
                            key={index}
                            value={item.name}
                        >
                            {`(UTC ${item.utc_offset}) ${item.city}`}
                        </option>
                    ))}
                </select>
            </div>
            <Divider />
        </Modal>
    );
};

export default AddModal;