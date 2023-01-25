import React, {useEffect, useState} from 'react';
import { Controller } from 'react-hook-form';
// import timezoneData from "../../../data/timezone.json";
import styles from "../../../styles/Alarm.module.css";
import i18n from '../../../i18n';

const TimezoneContainer = ({ timezoneData, methods, isEdit }) => {

    const { control } = methods;

    const [timezones, setTimezones] = useState([]);

    useEffect(() => {
        const sortedTimezones = timezoneData.sort((a, b) => {
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        setTimezones(sortedTimezones);
    }, [timezoneData]);

    return (
        <div>
            <span className={styles.inputTitle}>{i18n.t('timezone')}</span>
            <Controller
                control={control}
                name="timezone"
                render={({ field: { onChange, value } }) => (
                    <select
                        className="form-select"
                        id="timezone"
                        aria-label="Floating label select example"
                        value={value}
                        onChange={onChange}
                        style={{ color: '#112466' }}
                    >
                        <option value="default">--{i18n.t('select_timezone')}--</option>
                        {timezones?.map((item, index) => (
                            <option
                                key={index}
                                value={item.name}
                            >
                                {`(UTC ${item.utc_offset}) ${item.city}`}
                            </option>
                        ))}
                    </select>
                )}
            />
        </div>
    )
};

export default TimezoneContainer;