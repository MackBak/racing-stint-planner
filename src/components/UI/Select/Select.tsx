import clsx from 'clsx';
import type { SelectProps } from './Select.types';
import styles from './Select.module.css';
import {JSX} from "react";

const Select = <T extends string | number | boolean>({
                                                         label,
                                                         value,
                                                         onChange,
                                                         options = [],
                                                         error,
                                                         required = false,
                                                         className,
                                                         ...props
                                                     }: SelectProps<T>): JSX.Element => {
    return (
        <div className={styles.container}>
            {label && (
                <label className={styles.label}>
                    {label}
                    {required && <span className={styles.required}>*</span>}
                </label>
            )}
            <select
                value={String(value)}
                onChange={onChange}
                className={clsx(
                    styles.select,
                    error && styles.error,
                    className
                )}
                {...props}
            >
                {options.map((option) => (
                    <option key={String(option.value)} value={String(option.value)}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <span className={styles.errorText}>{error}</span>}
        </div>
    );
};

export default Select;