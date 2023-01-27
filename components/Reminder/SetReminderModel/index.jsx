import React from "react";
import {Button, Divider, Modal} from "antd";
import styles from "../../../styles/Reminder.module.css";
import i18n from "../../../i18n";
import {FormProvider, useForm} from "react-hook-form";
import TimeContainer from "./TimeContainer";
import SoundContainer from "./SoundContainer";
import { MdPlayCircleOutline } from "react-icons/md";
import TitleContainer from "./TitleContainer";
import CategoryContainer from "./CategoryContainer";
import NoteContainer from "./NoteContainer";

const SetReminder = ({ isEdit, show, close, categoryData }) => {

    const methods = useForm();

    const handleSubmitForm = (formData) => {
        formData = {...formData, dateTime: new Date(formData.dateTime)};
        console.log(formData);
    };

    return (
        <>
            <Modal
                title={<span className={styles.alarmModalTitle}>{isEdit ? i18n.t('edit_reminder') : i18n.t('set_reminder')}</span>}
                open={show}
                footer={null}
                onCancel={close}
                centered
                className={styles.modal}
            >
                <Divider className={styles.dividerBar} />
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(handleSubmitForm)}>
                        <div className={styles.row}>
                            <div className={styles.col}>
                                <TimeContainer methods={methods} />
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.col}>
                                <SoundContainer methods={methods} isEdit={isEdit} />
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.col}>
                                <TitleContainer methods={methods} />
                            </div>
                            <div className={styles.col}>
                                <CategoryContainer methods={methods} categoryData={categoryData} />
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.col}>
                                <NoteContainer methods={methods} />
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.btnCol}>
                                <Button className={styles.footerBtn}>
                                    <MdPlayCircleOutline fill='#112466' />{i18n.t('test')}
                                </Button>
                                <Button className={styles.footerBtn} htmlType='submit'>
                                    {isEdit ? i18n.t('edit') : i18n.t('start')}
                                </Button>
                            </div>
                        </div>
                    </form>
                </FormProvider>
            </Modal>
        </>
    );
};

export default SetReminder;