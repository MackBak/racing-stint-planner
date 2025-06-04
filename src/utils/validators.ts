import type { StintFormData, RaceConfig } from '@/types';

export interface ValidationResult {
    isValid: boolean;
    errors: string[];
}

export const validators = {
    isPositiveNumber: (value: number): boolean => {
        return !isNaN(value) && value > 0;
    },

    isValidLaptime: (laptime: number): boolean => {
        return validators.isPositiveNumber(laptime) && laptime >= 300 && laptime <= 900;
    },

    isValidFuelAmount: (fuel: number, maxFuel: number): boolean => {
        return validators.isPositiveNumber(fuel) && fuel <= maxFuel;
    },

    isValidStintData: (stintData: StintFormData, config: RaceConfig): ValidationResult => {
        const errors: string[] = [];

        if (!validators.isPositiveNumber(stintData.laps)) {
            errors.push('Laps must be a positive number');
        }

        if (!validators.isValidLaptime(stintData.customLaptime)) {
            errors.push('Laptime must be between 300-900 seconds');
        }

        if (!validators.isValidFuelAmount(stintData.fuelToAdd, config.maxFuel)) {
            errors.push(`Fuel amount must be between 0-${config.maxFuel}L`);
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }
} as const;