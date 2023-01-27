import React from "react";
import styles from "../../../styles/Reminder.module.css";
import i18n from "../../../i18n";
import {Controller} from "react-hook-form";

const CategoryContainer = ({ methods, categoryData }) => {

    const { control } = methods;

    return (
        <div>
            <span className={styles.inputTitle}>{i18n.t('category')}</span>
            <Controller
                control={control}
                name="country"
                render={({ field: { onChange, value } }) => (
                    <select
                        className="form-select"
                        id="country"
                        aria-label="Floating label select example"
                        value={value}
                        onChange={onChange}
                        style={{ color: '#112466' }}
                    >
                        <option value="default">--{i18n.t('select_category')}--</option>
                        {categoryData?.map((item, index) => (
                            <option
                                key={index}
                                value={item._id}
                            >
                                {item.name}
                            </option>
                        ))}
                    </select>
                )}
            />
        </div>
    );
};

export default CategoryContainer;