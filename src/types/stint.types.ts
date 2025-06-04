import type { WeatherCondition } from './common.types';

export interface StintData {
    id: number;
    driverNumber: number;
    laps: number;
    weather: WeatherCondition;
    customLaptime: number;
    tireChange: boolean;
    fuelToAdd: number;
}

export interface CalculatedStintData extends StintData {
    stintNumber: number;
    fuelUsed: number;
    pitStopTime: number;
    stintTime: number;
    totalTime: number;
    fuelRemaining: number;
    isLowFuel: boolean;
}

export interface StintFormData {
    driverNumber: number;
    laps: number;
    weather: WeatherCondition;
    customLaptime: number;
    tireChange: boolean;
    fuelToAdd: number;
}