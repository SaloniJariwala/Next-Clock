import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import styles from "../../../styles/Alarm.module.css";
import i18n from '../../../i18n';

const MinutesContainer = ({ methods, isEdit }) => {

    const { control } = methods;
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const getMinutes = () => {
            let mArr = [];
            for (let j = 0; j <= 59; j++) {
                if (j < 10) {
                    mArr = [...mArr, { display: `0${j.toString()}`, value: j.toString() }];
                } else {
                    mArr = [...mArr, { display: `${j.toString()}`, value: j.toString() }];
                }
            }
            setOptions(mArr);
        };
        getMinutes();
    }, []);

    useEffect(() => {
        if (!isEdit) {
            methods.setValue('minute', '0');
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <span className={styles.inputTitle}>{i18n.t('minutes')}</span>
            <Controller
                control={control}
                name="minute"
                render={({ field: { onChange, value } }) => (
                    <select
                        className="form-select"
                        id="minute"
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

export default MinutesContainer;