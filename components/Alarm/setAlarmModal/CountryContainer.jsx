import React, {useEffect, useState} from 'react';
import { Controller } from 'react-hook-form';
import styles from "../../../styles/Alarm.module.css";
import i18n from '../../../i18n';

const CountryContainer = ({
    countryData,
    methods,
    isEdit,
    settingSelectedCountryId
}) => {

    const { control } = methods;
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const sortedCountries = countryData?.sort((a, b) => {
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
        setCountries(sortedCountries);
    }, []);

    const handleChange = (event, onChange) => {
        onChange(event);
        settingSelectedCountryId(event.target.value);
    };

    return (
        <div>
            <span className={styles.inputTitle}>{i18n.t('country')}</span>
            <Controller
                control={control}
                name="country"
                render={({ field: { onChange, value } }) => (
                    <select
                        className="form-select"
                        id="country"
                        aria-label="Floating label select example"
                        value={value}
                        onChange={(event) => handleChange(event, onChange)}
                        style={{ color: '#112466' }}
                    >
                        <option value="default">--{i18n.t('select_country')}--</option>
                        {countries?.map((item, index) => (
                            <option
                                key={index}
                                value={item._id}
                            >
                                {item.name}
                            </option>
                        ))}
                    </select>
                )}
            />
        </div>
    )
}

export default CountryContainer;