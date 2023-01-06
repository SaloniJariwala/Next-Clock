import React, { useEffect, useRef, useState } from 'react';
import styles from "../../../styles/Alarm.module.css";
import { MdPlayCircleOutline, MdPauseCircleOutline } from "react-icons/md";
import { IoCloudUploadOutline } from "react-icons/io5";
import useTranslation from 'next-translate/useTranslation';
import { audioData } from '../../../data/audios';
import { Controller } from 'react-hook-form';
import { Slider } from 'antd';

const SoundContainer = ({
    methods,
    isEdit,
    selectedAlarm
}) => {

    const { t } = useTranslation();
    const audioRef = useRef();
    const { control } = methods;

    const [audioPlay, setAudioPlay] = useState(true);
    const [audioName, setAudioName] = useState('selected');
    const [volume, setVolume] = useState(50);
    const [options, setOptions] = useState([]);

    const handleChange = (event) => {
        setAudioName(event.target.value);
        methods.setValue('sound', event.target.value);
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
        audioRef.current.volume = parseFloat(volume / 100);
        audioRef.current.loop = true;
    }

    const pause = () => {
        audioRef.current.pause();
    };

    const handleVolumeChange = (value) => {
        methods.setValue('volume', value);
        setVolume(value);
    }

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

    const handleFileChange = (event) => {
        const audio = URL.createObjectURL(event.target.files[0]);
        const newAudio = {
            audioTitle: event.target.files[0].name,
            track: audio
        }
        const array = options;
        array.push(newAudio);
        setOptions(array);
        methods.setValue('sound', audio);
        setAudioName(audio);
    };

    return (
        <div className={styles.outerContainer}>
            <div style={{ width: '100%' }}>
                <div className={styles.titleOuter}>
                    <span className={styles.inputTitle}>{t('common:sound')}</span>
                    <button
                        className={styles.playBtn}
                        onClick={handleButtonClick}
                    >
                        {audioPlay ? <MdPlayCircleOutline fill='#112466' /> : <MdPauseCircleOutline fill='#112466' />}
                    </button>
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
                                    <option value={'selected'}>--{t('select_sound')}--</option>
                                    {audioData?.map((item, index) => (
                                        <option
                                            key={index}
                                            value={item.track}
                                        >
                                            {item.audioTitle}
                                        </option>
                                    ))}
                                </select>
                            )}
                        />
                    </div>
                    <button
                        className={styles.uploadBtn}
                        style={{ marginRight: 20 }}
                    >
                        <IoCloudUploadOutline
                            fill='#112466'
                            style={{ height: '1.5em', width: '1.5em' }}
                        />
                        <input
                            type={"file"}
                            accept={"audio/*"}
                            onChange={(event) => handleFileChange(event)}
                            style={{
                                cursor: 'pointer',
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                opacity: 0
                            }}
                        />
                    </button>
                </div>
            </div>
            <div style={{ width: '100%' }}>
                <span className={styles.inputTitle}>{t('common:volume')}</span>
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