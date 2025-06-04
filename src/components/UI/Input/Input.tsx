import React from 'react';
import clsx from 'clsx';
import type { InputProps } from './Input.types';
import styles from './Input.module.css';

const Input: React.FC<InputProps> = ({
                                         label,
                                         type = 'text',
                                         value,
                                         onChange,
                                         error,
                                         required = false,
                                         className,
                                         ...props
                                     }) => {
    return (
        <div className={styles.container}>
            {label && (
                <label className={styles.label}>
                    {label}
                    {required && <span className={styles.required}>*</span>}
                </label>
            )}
            <input
                type={type}
                value={value}
                onChange={onChange}
                className={clsx(
                    styles.input,
                    error && styles.error,
                    className
                )}
                {...props}
            />
            {error && <span className={styles.errorText}>{error}</span>}
        </div>
    );
};

export default Input;