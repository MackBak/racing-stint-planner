import type { WeatherCondition, Driver, RaceConfig } from '@/types';

export const WEATHER_CONDITIONS: Record<string, WeatherCondition> = {
    DRY: 'dry',
    DAMP: 'damp',
    WET: 'wet'
} as const;

export const DRIVERS: Driver[] = [
    { id: 1, name: 'Driver 1' },
    { id: 2, name: 'Driver 2' },
    { id: 3, name: 'Driver 3' },
    { id: 4, name: 'Driver 4' },
    { id: 5, name: 'Driver 5' }
] as const;

export const DEFAULT_CONFIG: RaceConfig = {
    raceDuration: 21600, // 6 hours in seconds
    maxFuel: 110,
    fuelPerLap: 12.8,
    laptimes: {
        dry: 481,
        damp: 540,
        wet: 580
    },
    pitStopLoss: 23,
    fuelFillRate: 2.4,
    tireChangeTime: 20,
    raceStart: { hours: 12, minutes: 40, seconds: 0 }
} as const;