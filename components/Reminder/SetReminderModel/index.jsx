import React from "react";
import {Divider, Modal} from "antd";
import styles from "../../../styles/Reminder.module.css";
import i18n from "../../../i18n";
import {FormProvider, useForm} from "react-hook-form";
import TimeContainer from "./TimeContainer";
import SoundContainer from "./SoundContainer";

const SetReminder = ({ isEdit, show, close }) => {

    const methods = useForm();

    const handleSubmitForm = (form) => {

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
                    <form onSubmit={methods.handleSubmit()}>
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
                    </form>
                </FormProvider>
            </Modal>
        </>
    );
};

export default SetReminder;