export const calculations = {
    calculatePitStopTime: (
        fuelToAdd: number,
        fuelFillRate: number,
        pitStopLoss: number,
        tireChange: boolean,
        tireChangeTime: number
    ): number => {
        const fuelTime = Math.ceil(fuelToAdd / fuelFillRate);
        return pitStopLoss + fuelTime + (tireChange ? tireChangeTime : 0);
    },

    calculateStintTime: (laps: number, laptime: number, pitStopTime: number): number => {
        return (laps * laptime) + pitStopTime;
    },

    calculateFuelUsage: (laps: number, fuelPerLap: number): number => {
        return laps * fuelPerLap;
    },

    calculateRemainingFuel: (currentFuel: number, fuelAdded: number, fuelUsed: number): number => {
        return Math.max(0, currentFuel + fuelAdded - fuelUsed);
    }
} as const;