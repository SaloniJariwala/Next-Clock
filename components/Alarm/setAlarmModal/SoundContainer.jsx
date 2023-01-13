import React, { useEffect, useRef, useState } from 'react';
import styles from "../../../styles/Alarm.module.css";
import { MdPlayCircleOutline, MdPauseCircleOutline } from "react-icons/md";
// import { IoCloudUploadOutline } from "react-icons/io5";
import i18n from '../../../i18n';
import { audioData } from '../../../data/audios';
import { Controller } from 'react-hook-form';
import { Slider, Button } from 'antd';
import { useRouter } from 'next/router';
import {getLanguageLabel} from '../../../utils/getAlarmLabel';

const SoundContainer = ({
    methods,
    isEdit,
    selectedAlarm
}) => {

    const audioRef = useRef();
    const { control } = methods;

    const [audioPlay, setAudioPlay] = useState(true);
    const [audioName, setAudioName] = useState('selected');
    const [volume, setVolume] = useState(50);
    const [options, setOptions] = useState([]);

    const pathname = useRouter();

    const handleChange = (event) => {
        methods.setValue('sound', event.target.value);
        audioData.forEach((item) => {
            if (item.audioId === event.target.value) {
                setAudioName(item.track);
            }
        })
    };

    useEffect(() => {
        setOptions(audioData);
        if (!isEdit) {
            methods.setValue('volume', 50);
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (isEdit) {
            setAudioName(selectedAlarm?.alarmTune);
            setVolume(selectedAlarm?.alarmVolume);
        }
    }, [isEdit, selectedAlarm?.alarmTune, selectedAlarm?.alarmVolume]);

    const play = () => {
        audioRef.current.play();
        // audioRef.current.volume = parseFloat(volume / 100);
        audioRef.current.loop = true;
    };

    const pause = () => {
        audioRef.current.pause();
    };

    const handleVolumeChange = (value) => {
        methods.setValue('volume', value);
        setVolume(value);
    };

    const handleButtonClick = () => {
        if (audioName === 'selected') {
            alert('Please Select Sound first');
        } else {
            setAudioPlay(!audioPlay);
            if (audioPlay) {
                play();
            } else {
                pause();
            }
        }
    };

    return (
        <div className={styles.outerContainer}>
            <div style={{ width: '100%' }}>
                <div className={styles.titleOuter}>
                    <span className={styles.inputTitle}>{i18n.t('sound')}</span>
                    <Button
                        className={styles.playBtn}
                        style={{ padding: 'unset', fontSize: 'unset', height: 'unset' }}
                        onClick={handleButtonClick}

                    >
                        {audioPlay ? <MdPlayCircleOutline fill='#112466' /> : <MdPauseCircleOutline fill='#112466' />}
                    </Button>
                </div>
                <audio src={audioName} ref={audioRef} />
                <div className={styles.audioContainer}>
                    <div className={styles.audioSelect} style={{ display: "flex" }}>
                        <Controller
                            control={control}
                            name="sound"
                            render={({ field: { value } }) => (
                                <select
                                    className="form-select"
                                    id="sound"
                                    aria-label="Floating label select example"
                                    value={value}
                                    onChange={(event) => handleChange(event)}
                                    style={{ color: '#112466' }}
                                >
                                    <option value={'selected'}>--{i18n.t('select_sound')}--</option>
                                    {audioData?.map((item, index) => (
                                        <option
                                            key={index}
                                            value={item.audioId}
                                        >
                                            {/* {item.audioTitle} */}
                                            {getLanguageLabel(pathname.locale, item)}
                                        </option>
                                    ))}
                                </select>
                            )}
                        />
                    </div>
                </div>
            </div>
            <div style={{ width: '100%' }}>
                <span className={styles.inputTitle}>{i18n.t('volume')}</span>
                <div style={{ width: '100%' }} className={styles.uploadBtn}>
                    <Controller
                        control={control}
                        name="volume"
                        render={({ field: { value } }) => (
                            <Slider value={value} onChange={handleVolumeChange} />
                        )}
                    />
                </div>
            </div>
        </div>
    )
}

export default SoundContainer;