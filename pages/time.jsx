import Head from 'next/head';
import React, {useEffect} from 'react';
import Clock from '../components/Time/index';
import styles from "../styles/Time.module.css";
import axios from "axios";
import {GET_COUNTRY_API, GET_TIMEZONE_BY_COUNTRY} from "../constant/endpoints";

const Time = ({ timezoneData, countryData }) => {

    useEffect(() => {
        const current = timezoneData?.find((item) => item.name === Intl.DateTimeFormat().resolvedOptions().timeZone);
        const timezones = JSON.parse(localStorage.getItem('TimezoneList')) || [];
        const localCurrent = timezones?.find((item) => item.name === Intl.DateTimeFormat().resolvedOptions().timeZone);
        if(!localCurrent) {
            timezones.push(current);
        }
        localStorage.setItem('TimezoneList',JSON.stringify(timezones));
    }, []);

    return (
        <>
            <Head>
                <title>Clock App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Rubik&display=swap" rel="stylesheet" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap" rel="stylesheet" />
            </Head>
            <div className={styles.main}>
                <Clock timezoneData={timezoneData} countryData={countryData} />
            </div>
        </>
    )
};

export async function getServerSideProps () {

    let timezoneData, countryData;

    await axios.get(GET_TIMEZONE_BY_COUNTRY)
        .then((response) => {
            timezoneData = response.data;
        })
        .catch((error) => {
            console.log(error);
        });

    await axios.get(GET_COUNTRY_API)
        .then((response) => {
            countryData = response.data;
        })
        .catch((error) => {
            console.log(error);
        });

    return {
        props: {
            timezoneData,
            countryData
        }
    }
}

export default Time;