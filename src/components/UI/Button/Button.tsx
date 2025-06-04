import React from 'react';
import clsx from 'clsx';
import type { ButtonProps } from './Button.types';
import styles from './Button.module.css';

const Button: React.FC<ButtonProps> = ({
                                           children,
                                           onClick,
                                           variant = 'primary',
                                           size = 'medium',
                                           disabled = false,
                                           className,
                                           ...props
                                       }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={clsx(
                styles.button,
                styles[variant],
                styles[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;