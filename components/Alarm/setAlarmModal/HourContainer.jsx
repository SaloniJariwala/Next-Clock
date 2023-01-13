import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import styles from "../../../styles/Alarm.module.css";
import i18n from '../../../i18n';

const HourContainer = ({ methods, isEdit }) => {

    const { control } = methods;
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const getHours = () => {
            const format = localStorage.getItem('format');
            let arr = [];
            const startPoint = format === '24' ? 0 : 1;
            const endPoint = format === '12' ? 12 : 23;
            for (let i = startPoint; i <= endPoint; i++) {
                if (i < 10) {
                    arr = [...arr, { display: `0${i.toString()}`, value: i.toString() }];
                } else {
                    arr = [...arr, { display: `${i.toString()}`, value: i.toString() }];
                }
            }
            setOptions(arr);
        };
        getHours();
    }, []);

    useEffect(() => {
        if (!isEdit) {
            methods.setValue('hour', '0');
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <span className={styles.inputTitle}>{i18n.t('hours')}</span>
            <Controller
                control={control}
                name="hour"
                render={({ field: { onChange, value } }) => (
                    <select
                        className="form-select"
                        id="hour"
                        aria-label="Floating label select example"
                        value={value}
                        onChange={onChange}
                        style={{ color: '#112466' }}
                    >
                        {options?.map((item, index) => (
                            <option
                                key={index}
                                value={item.value}
                            >
                                {item.display}
                            </option>
                        ))}
                    </select>
                )}
            />
        </div>
    );
};

export default HourContainer;