import type { SelectHTMLAttributes, ChangeEvent } from 'react';
import type { SelectOption } from '@/types';

export interface SelectProps<T = string | number | boolean> extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
    label?: string;
    value: T;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    options: SelectOption<T>[];
    error?: string;
    required?: boolean;
    className?: string;
}