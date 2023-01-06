import React, { useEffect, useState } from 'react';
import { Divider, Modal } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import styles from "../../../styles/Alarm.module.css";
import { FormProvider, useForm } from 'react-hook-form';
import { MdPlayCircleOutline } from "react-icons/md";
import CountryContainer from './CountryContainer';
import HourContainer from './HourContainer';
import MinutesContainer from './MinuteContainer';
import SoundContainer from './SoundContainer';
import TitleContainer from './TitleContainer';
import NoteContainer from './NoteContainer';
import RepeatContainer from './RepeatContainer';
import ZoneContainer from './ZoneContainer';
import timezoneData from '../../../data/timezone.json';
import { getTimezoneOffsetInUtc } from '../../../utils/getTimezoneOffsetInUtc';
import { calculateTime } from '../../../utils/calculateCountryTime';
import defaultAlarmTune from '../../../Assets/audios/alarm.mp3'

const SetAlarmModal = ({
    show,
    close,
    closeRepeat,
    storeAlarm,
    handleEditAlarm,
    callToAlarm,
    isEdit = false
}) => {

    const { t } = useTranslation();
    const methods = useForm();

    const [format, setFormat] = useState();

    useEffect(() => {
        const fmt = localStorage.getItem('format');
        setFormat(fmt);
    });

    const countryWiseSetAlarm = (payload) => {
        const newDate = new Date();
        newDate.setHours(Number(payload.hour));
        newDate.setMinutes(Number(payload.minute));
        newDate.setSeconds(0);
        if (newDate < new Date()) {
            newDate.setHours(Number(payload.hour) + 24);
        }
        const countryTime = newDate;
        const localCountry = timezoneData[Intl.DateTimeFormat().resolvedOptions().timeZone];
        const flag = getTimezoneOffsetInUtc() > (payload.country.timezoneOffset * 100) ? localCountry : payload.country.value;
        let fDate;
        if (localCountry === payload.country.value) {
            fDate = newDate;
        } else {
            if (flag === localCountry) {
                const payloadCountryDate = calculateTime(payload.country.timezoneOffset);
                const diffTime = Date.now() - payloadCountryDate.getTime();
                fDate = newDate.getTime() + diffTime;
                if (Number.isInteger(Number(payload.country.timezoneOffset)) === false) {
                    fDate = fDate - 720000;
                }
                fDate = new Date(fDate);
            } else {
                const payloadCountryDate = calculateTime(payload.country.timezoneOffset);
                const diffTime = payloadCountryDate.getTime() - Date.now();
                fDate = newDate.getTime() - diffTime;
                if (Number.isInteger(Number(payload.country.timezoneOffset)) === false) {
                    fDate = fDate - 720000;
                }
                fDate = new Date(fDate);
            }
        }
        let newPayload = {
            countryTime: countryTime,
            country: payload.country,
            alarmDate: fDate,
            originalAlarm: fDate,
            alarmTitle: payload.alarmTitle,
            alarmNote: payload.alarmNote,
            alarmTune: payload.sound || defaultAlarmTune,
            alarmVolume: payload.volume,
        };
        if (payload.isRepeat) {
            newPayload = { ...newPayload, alarmRepeat: payload.repeat };
        }
        if (isEdit) {
            handleEditAlarm(newPayload);
        } else {
            storeAlarm(newPayload);
        }
        callToAlarm();
    };

    const handleFormSubmit = (formData) => {
        close();
        let payload = { ...formData, country: JSON.parse(formData.country) };
        const ampm = methods.getValues('ampm');
        if (ampm === 'PM') {
            payload = { ...payload, hour: Number(payload.hour) + 12 };
        };
        countryWiseSetAlarm(payload);
    }

    return (
        <Modal
            title={<span className={styles.alarmModalTitle}>{isEdit ? t('common:edit_alarm') : t('common:set_alarm')}</span>}
            open={show}
            footer={null}
            onCancel={close}
            centered
            className={styles.modal}
            width={'fit-content'}
        >
            <Divider className={styles.dividerBar} />
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
                    <div className={styles.row}>
                        <div className={styles.col}>
                            <CountryContainer methods={methods} key={'country'} />
                        </div>
                        <div className={styles.col}>
                            <HourContainer methods={methods} key={'hour'} />
                        </div>
                        <div className={styles.col}>
                            <MinutesContainer methods={methods} key={'minute'} />
                        </div>
                        {format === '12' && (
                            <div className={styles.col}>
                                <ZoneContainer methods={methods} isEdit={isEdit} key={'zone'} />
                            </div>
                        )}
                    </div>
                    <div className={styles.row}>
                        <div className={styles.col}>
                            <SoundContainer methods={methods} key={'sound'} />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.col}>
                            <TitleContainer methods={methods} key={'title'} />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.col}>
                            <NoteContainer methods={methods} key={'title'} />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.col}>
                            <RepeatContainer
                                methods={methods}
                                key={'repeat'}
                                closeRepeat={closeRepeat}
                                isEdit={isEdit}
                            />
                        </div>
                    </div>
                    <Divider className={styles.dividerBar} />
                    <div className={styles.row}>
                        <div className={styles.btnCol}>
                            <button className={styles.footerBtn}>
                                <MdPlayCircleOutline fill='#112466' />{t('common:test')}
                            </button>
                            <button className={styles.footerBtn}>
                                {t('common:start')}
                            </button>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Modal>
    )
}

export default SetAlarmModal;