import { useEffect } from "react";
import { Controller } from "react-hook-form";
import useTranslation from "next-translate/useTranslation";
import styles from "../../../styles/Alarm.module.css";

const ZoneContainer = ({ methods, isEdit }) => {

    const { control } = methods;
    const { t } = useTranslation();

    useEffect(() => {
        if (!isEdit) {
            methods.setValue('ampm', 'selected');
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <span className={styles.inputTitle}>{t('common:ampm')}</span>
            <Controller
                control={control}
                name="ampm"
                render={({ field: { onChange, value } }) => (
                    <select
                        className="form-select"
                        id="ampm"
                        aria-label="Floating label select example"
                        value={value}
                        onChange={onChange}
                        style={{ color: '#112466' }}
                    >
                        <option key={'selected'} value={'selected'}>--Select--</option>
                        <option key={'am'} value={'AM'}>AM</option>
                        <option key={'pm'} value={'PM'}>PM</option>
                    </select>
                )}
            />
        </div>
    );
};

export default ZoneContainer;