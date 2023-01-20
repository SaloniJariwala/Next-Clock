import React, { useEffect, useRef, useState } from 'react';
import styles from "./../../../styles/Alarm.module.css";
import { MdPlayCircleOutline, MdPauseCircleOutline } from "react-icons/md";
import { IoCloudUploadOutline } from "react-icons/io5";
import useTranslation from 'next-translate/useTranslation';
import { audioData } from '../../../data/audios';
import { Controller } from 'react-hook-form';
import { Button, Slider } from 'antd';

const DateTimerSound = ({
    methods,
    sound,
    // isEdit,
}) => {

    const { t } = useTranslation();
    const audioReference = useRef();
    const { control } = methods;

    const [audioPlay, setAudioPlay] = useState(true);
    const [audioName, setAudioName] = useState(sound);
    const [volume, setVolume] = useState(50);
    const [options, setOptions] = useState([]);
    const [timerValue,setTimerValue]=useState();

    const handleChange = (event) => {
        setAudioName(event.target.value);
        methods.setValue('sound', event.target.value);
        audioData.forEach((item)=>{
            if(item.audioId===event.target.value){
                setAudioName(item.track);
            }
        })
    };

    useEffect(() => {
        const getTimer=JSON.parse(localStorage.getItem('timer'))||[];
        setTimerValue(getTimer)
        setOptions(audioData);
        // if (!isEdit) {
            methods.setValue('volume', 50);
        // }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        // if (isEdit) {
            setAudioName(timerValue?.sound);
            setVolume(timerValue?.volume);
        // }
    }, []);

    const play = () => {
        audioReference.current.play();
        audioReference.current.volume = parseFloat(volume / 100);
        audioReference.current.loop = true;
    }

    const pause = () => {
        audioReference.current.pause();
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

    // const handleFileChange = (event) => {
    //     const audio = URL.createObjectURL(event.target.files[0]);
    //     const newAudio = {
    //         audioTitle: event.target.files[0].name,
    //         track: audio
    //     }
    //     const array = options;
    //     array.push(newAudio);
    //     setOptions(array);
    //     methods.setValue('sound', audio);
    //     setAudioName(audio);
    // };

    return (
        <div className={styles.outerContainer}>
            <div style={{ width: '100%' }}>
                <div className={styles.titleOuter}>
                    <span className={styles.inputTitle}>Sound</span>
                    <Button
                        className={styles.playBtn}
                        onClick={handleButtonClick}
                    >
                        {audioPlay ? <MdPlayCircleOutline fill='#112466' /> : <MdPauseCircleOutline fill='#112466' />}
                    </Button>
                </div>
                <audio src={audioName} ref={audioReference} />
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
                                            value={item.audioId}
                                        >
                                            {item.audioTitle}
                                        </option>
                                    ))}
                                </select>
                            )}
                        />
                    </div>
                    {/* <button
                        className={styles.uploadBtn}
                        style={{ marginRight: 20 }}
                    >
                        
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
                    </button> */}
                </div>
            </div>
            <div style={{ width: '100%',marginTop:"1.5%"}}>
                <span className={styles.inputTitle}>Volume</span>
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

export default DateTimerSound;