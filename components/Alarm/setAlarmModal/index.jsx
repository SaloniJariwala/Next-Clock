import React, { useEffect, useRef, useState } from 'react';
import { Button, Divider, Modal } from 'antd';
import styles from "../../../styles/Alarm.module.css";
import { FormProvider, set } from 'react-hook-form';
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
import defaultAlarmTune from '../../../Assets/audios/alarm.mp3';
import i18n from '../../../i18n';
import TestAlarmModal from '../testAlarmModal';
import { audioData } from '../../../data/audios';

const SetAlarmModal = ({
    show,
    close,
    methods,
    closeRepeat,
    storeAlarm,
    handleEditAlarm,
    callToAlarm,
    isEdit = false
}) => {

    const testRef = useRef();

    const [format, setFormat] = useState();
    const [showTestModal, setShowTestModal] = useState(false);
    const [currentAlarm, setCurrentAlarm] = useState();
    const [audio, setAudio] = useState(defaultAlarmTune);

    const testPlay = () => {
        // if(testRef.current) {
            testRef.current.play();
            testRef.current.loop = true;
        // }
    };

    const testPause = () => {
        // if(testRef.current) {
            testRef.current.pause();
        // }
    };

    const closeTestModal = () => {
        setShowTestModal(false);
    };

    const handleStop = () => {
        testPause();
        closeTestModal();
    };

    useEffect(() => {
        const fmt = localStorage.getItem('format');
        setFormat(fmt);
    });

    const countryWiseSetAlarm = (payload) => {
        const newDate = new Date();
        newDate.setHours(Number(payload.hour));
        newDate.setMinutes(Number(payload.minute));
        newDate.setSeconds(0);
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
            startedTime: payload.startedTime,
            alarmDate: fDate,
            originalAlarm: fDate,
            alarmTitle: payload.alarmTitle,
            alarmNote: payload.alarmNote,
            alarmTune: payload.sound || defaultAlarmTune,
            alarmVolume: payload.volume,
        };
        if (payload.isRepeat) {
            newPayload = { ...newPayload, alarmRepeat: payload.repeatDays };
        }
        if (isEdit) {
            handleEditAlarm(newPayload);
        } else {
            storeAlarm(newPayload);
        }
        callToAlarm();
    };

    const handleFormSubmit = (formData) => {
        const startedTime = new Date();
        close();
        let payload = { ...formData, startedTime, country: JSON.parse(formData.country) };
        const ampm = methods.getValues('ampm');
        if (ampm === 'PM') {
            payload = { ...payload, hour: Number(payload.hour) + 12 };
        }
        countryWiseSetAlarm(payload);
    };

    const handleTest = () => {
        const date = new Date();
        date.setHours(methods.getValues('hour'));
        date.setHours(methods.getValues('minute'));
        const alarm = {
            title: methods.getValues('alarmTitle'),
            note: methods.getValues('alarmNote'),
            country: JSON.parse(methods.getValues('country')),
            orgTimestamp: date.getTime()
        };
        const audios = audioData.filter((item) => item.audioId === methods.getValues('sound'));
        setAudio(audios[0]?.track);
        testPlay();
        setCurrentAlarm(alarm);
        setShowTestModal(true);
    };

    return (
        <>
            <audio src={audio} ref={testRef} />
            <Modal
                title={<span className={styles.alarmModalTitle}>{isEdit ? i18n.t('edit_alarm') : i18n.t('set_alarm')}</span>}
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
                        <div>
                            <div className={styles.btnCol}>
                                <Button className={styles.footerBtn} onClick={handleTest}>
                                    <MdPlayCircleOutline fill='#112466' />{i18n.t('test')}
                                </Button>
                                <Button className={styles.footerBtn} htmlType='submit'>
                                    {isEdit ? i18n.t('edit') : i18n.t('start')}
                                </Button>
                            </div>
                        </div>
                    </form>
                </FormProvider>
                <TestAlarmModal
                    show={showTestModal}
                    closeModal={closeTestModal}
                    currentAlarm={currentAlarm}
                    handleStop={handleStop}
                />
            </Modal>
        </>
    )
};

export default SetAlarmModal;