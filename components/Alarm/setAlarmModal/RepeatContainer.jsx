import React, { useEffect, useState } from 'react';
import { Checkbox, Switch } from 'antd';
import i18n from '../../../i18n';
import styles from "../../../styles/Alarm.module.css";
import { Controller } from 'react-hook-form';

const RepeatContainer = ({ methods, closeRepeat, isEdit }) => {

    const { control } = methods;

    const [isRepeat, setIsRepeat] = useState(false);

    const handleSwitchChange = (checked) => {
        methods.setValue('isRepeat', checked);
        setIsRepeat(!isRepeat);
    }

    useEffect(() => {
        if (closeRepeat && !isEdit) {
            setIsRepeat(false);
            methods.setValue('isRepeat', false);
        }
    }, [closeRepeat]);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <span className={styles.inputTitle} style={{ marginRight: 10 }}>{i18n.t('repeat')}</span>{' '}
                <Controller
                    control={control}
                    name="isRepeat"
                    render={({ field: { value } }) => (
                        <Switch
                            size='small'
                            onChange={handleSwitchChange}
                            checked={value}
                        />
                    )}
                />
            </div>
            {isRepeat && (
                <Controller
                    control={control}
                    name="repeatDays"
                    render={({ field: { onChange, value } }) => (
                        <Checkbox.Group
                            // options={options}
                            // defaultValue={['Apple']}
                            onChange={onChange}
                            value={value}
                            className={styles.antCheckboxWrapper}
                            style={{ color: '#112466' }}
                        >
                            <Checkbox value={1}>{i18n.t('mon')}</Checkbox>
                            <Checkbox value={2}>{i18n.t('tue')}</Checkbox>
                            <Checkbox value={3}>{i18n.t('wed')}</Checkbox>
                            <Checkbox value={4}>{i18n.t('thu')}</Checkbox>
                            <Checkbox value={5}>{i18n.t('fri')}</Checkbox>
                            <Checkbox value={6}>{i18n.t('sat')}</Checkbox>
                            <Checkbox value={7}>{i18n.t('sun')}</Checkbox>
                        </Checkbox.Group>
                    )}
                />
            )}
        </div>
    )
}

export default RepeatContainer;