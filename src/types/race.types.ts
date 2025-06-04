import type { WeatherCondition, TimeValue } from './common.types';

export interface RaceConfig {
    raceDuration: number;
    maxFuel: number;
    fuelPerLap: number;
    laptimes: Record<WeatherCondition, number>;
    pitStopLoss: number;
    fuelFillRate: number;
    tireChangeTime: number;
    raceStart: TimeValue;
}

export interface Driver {
    id: number;
    name: string;
}