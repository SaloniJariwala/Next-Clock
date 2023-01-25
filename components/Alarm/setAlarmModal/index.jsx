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
import defaultAlarmTune from '../../../Assets/audios/alarm.mp3';
import i18n from '../../../i18n';
import TestAlarmModal from '../testAlarmModal';
import { audioData } from '../../../data/audios';
import axios from "axios";
import {GET_TIMEZONE_BY_COUNTRY} from "../../../constant/endpoints";
import TimezoneContainer from "./TimezoneContainer";

const SetAlarmModal = ({
    show,
    close,
    methods,
    closeRepeat,
    storeAlarm,
    handleEditAlarm,
    callToAlarm,
    countryData,
    isEdit = false
}) => {

    const testRef = useRef();

    const [format, setFormat] = useState();
    const [showTestModal, setShowTestModal] = useState(false);
    const [currentAlarm, setCurrentAlarm] = useState();
    const [audio, setAudio] = useState(defaultAlarmTune);
    const [selectedCountryId, setSelectedCountryId] = useState();
    const [timezoneData, setTimezoneData] = useState([]);

    const settingSelectedCountryId = (id) => {
        setSelectedCountryId(id);
    };

    useEffect(() => {
        axios.get(`${GET_TIMEZONE_BY_COUNTRY}/${selectedCountryId}`)
            .then((response) => {
                setTimezoneData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [selectedCountryId]);

    const closeTestModal = () => {
        setShowTestModal(false);
    };

    const handleStop = () => {
        // testPause();
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
        const countryDate = newDate;
        let alarmDate;
        if(payload.timezone === Intl.DateTimeFormat().resolvedOptions().timeZone) {
            alarmDate = countryDate;
        } else {
            if(countryDate > new Date()) {
                const diffTime = Date.now() - new Date(new Date().toLocaleString("en-US", { timeZone: payload.timezone })).getTime();
                alarmDate = newDate.getTime() + diffTime;
                alarmDate = new Date(alarmDate);
            } else {
                const diffTime = new Date(new Date().toLocaleString("en-US", { timeZone: payload.timezone })).getTime() - Date.now();
                alarmDate = newDate.getTime() - diffTime;
                alarmDate = new Date(alarmDate);
            }
        }
        let newPayload = {
            country: payload.country,
            timezone: payload.timezone,
            startedTime: payload.startedTime,
            countryTimestamp: countryDate.getTime(),
            alarmTimestamp: alarmDate.getTime(),
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
        close();
        let payload = methods.getValues('ampm') === 'PM' ? { ...formData, hour: Number(FormData.hour) + 12 } : formData;
        payload = {...payload, startedTime: new Date().getTime()};
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
                                <CountryContainer
                                    methods={methods}
                                    countryData={countryData}
                                    settingSelectedCountryId={settingSelectedCountryId}
                                />
                            </div>
                            <div className={styles.col}>
                                <TimezoneContainer methods={methods} timezoneData={timezoneData} isEdit={isEdit} />
                            </div>
                        </div>
                        <div className={styles.row}>
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