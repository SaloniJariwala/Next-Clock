import React, { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { countryData } from "../../../data/countries";
import timezoneData from "../../../data/timezone.json";
import styles from "../../../styles/Alarm.module.css";
import i18n from '../../../i18n';

const CountryContainer = ({ methods, isEdit }) => {

    const { control } = methods;

    useEffect(() => {
        if (!isEdit) {
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const country = timezoneData[timezone];
            countryData.forEach((item) => {
                if (item.countryName === country) {
                    methods.setValue('country', JSON.stringify(item));
                }
            });
        }
        // eslint-disable-next-line
    }, []);

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
                        onChange={onChange}
                        style={{ color: '#112466' }}
                    >
                        <option value="default">--{i18n.t('select_country')}--</option>
                        {countryData?.map((item, index) => (
                            <option
                                key={index}
                                value={JSON.stringify(item)}
                            >
                                {`${item.countryName} (GMT${item.timezoneOffset})`}
                            </option>
                        ))}
                    </select>
                )}
            />
        </div>
    )
}

export default CountryContainer;