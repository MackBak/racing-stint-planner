export type WeatherCondition = 'dry' | 'damp' | 'wet';

export interface SelectOption<T = string | number | boolean> {
    value: T;
    label: string;
}

export interface TimeValue {
    hours: number;
    minutes: number;
    seconds: number;
}

// Branded types for type safety
type Brand<T, B> = T & { __brand: B };
export type Seconds = Brand<number, 'seconds'>;
export type Liters = Brand<number, 'liters'>;
export type LapNumber = Brand<number, 'lapNumber'>;

// Utility types
export type RacingTime = Seconds;
export type FuelAmount = Liters;
export type LapCount = LapNumber;