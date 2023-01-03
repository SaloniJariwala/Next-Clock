import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Divider, Switch } from 'antd';
import logo from "../Assets/logo.png";
import styles from "../styles/Layout.module.css";
import Tabs from './Tabs';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { HiLanguage } from "react-icons/hi2";
import { getLabelName } from '../utils/getLabelName';

const Header = () => {

    const router = useRouter();
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        localStorage.setItem('format', '24');
    }, []);

    const handleSwitchChange = (value) => {
        if (value) {
            localStorage.setItem('format', '12');
        } else {
            localStorage.setItem('format', '24');
        }
    }

    return (
        <div>
            <nav>
                <div className={styles.navbar}>
                    <Image alt={logo} src={logo} height={50} width={90} />
                    <div className={styles.rightSection}>
                        <div>
                            <Switch
                                size="default"
                                checkedChildren="12Hrs"
                                unCheckedChildren="24Hrs"
                                onChange={handleSwitchChange}
                            />
                        </div>
                        <button className={styles.languageBtn} onClick={() => setClicked(!clicked)}>
                            <HiLanguage style={{ height: 20, width: 20 }} />
                        </button>
                        {clicked && (
                            <div className={styles.optionsOuter}>
                                {router.locales.map((item, index) => (
                                    <li className={styles.options} key={index} value={item}>
                                        <Link href={router.asPath} className={styles.link} locale={item} onClick={() => setClicked(false)}>
                                            {getLabelName(item)}
                                        </Link>
                                    </li>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <Divider style={{ margin: '10 0' }} />
            </nav>
            <div className={styles.tabSection}>
                <Tabs />
            </div>
        </div >
    )
}

export default Header;