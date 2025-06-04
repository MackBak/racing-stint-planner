import React from 'react';
import { Trash2 } from 'lucide-react';
import Button from '@/components/UI/Button';
import { DRIVERS } from '@/utils/constants';
import { timeUtils } from '@/utils/timeUtils';
import { calculations } from '@/utils/calculations';
import type { StintTableProps } from './StintTable.types';
import type { CalculatedStintData, WeatherCondition } from '@/types';
import styles from './StintTable.module.css';

const StintTable: React.FC<StintTableProps> = ({ stints, config, onDeleteStint }) => {
    const getDriverName = (driverNumber: number): string => {
        return DRIVERS.find(d => d.id === driverNumber)?.name || `Driver ${driverNumber}`;
    };

    const getWeatherClass = (weather: WeatherCondition): string => {
        const classes: Record<WeatherCondition, string> = {
            dry: styles.weatherDry,
            damp: styles.weatherDamp,
            wet: styles.weatherWet
        };
        return classes[weather] || '';
    };

    const calculateStintData = (): CalculatedStintData[] => {
        let totalTime = 0;
        let totalLaps = 0;
        let currentFuel = config.maxFuel;

        return stints.map((stint, index) => {
            const fuelUsed = calculations.calculateFuelUsage(stint.laps, config.fuelPerLap);
            const pitStopTime = calculations.calculatePitStopTime(
                stint.fuelToAdd,
                config.fuelFillRate,
                config.pitStopLoss,
                stint.tireChange,
                config.tireChangeTime
            );
            const stintTime = calculations.calculateStintTime(stint.laps, stint.customLaptime, pitStopTime);

            currentFuel = calculations.calculateRemainingFuel(currentFuel, stint.fuelToAdd, fuelUsed);
            totalTime += stintTime;
            totalLaps += stint.laps;

            return {
                ...stint,
                stintNumber: index + 1,
                fuelUsed,
                pitStopTime,
                stintTime,
                totalTime,
                fuelRemaining: currentFuel,
                isLowFuel: currentFuel < fuelUsed
            };
        });
    };

    const stintData = calculateStintData();
    const finalTotalTime = stintData.length > 0 ? stintData[stintData.length - 1].totalTime : 0;
    const finalTotalLaps = stintData.reduce((sum, stint) => sum + stint.laps, 0);

    return (
        <div className={styles.container}>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead className={styles.tableHead}>
                    <tr>
                        <th className={styles.th}>Stint</th>
                        <th className={styles.th}>Driver</th>
                        <th className={styles.th}>Laps</th>
                        <th className={styles.th}>Weather</th>
                        <th className={styles.th}>Laptime</th>
                        <th className={styles.th}>Tire Change</th>
                        <th className={styles.th}>Fuel Added</th>
                        <th className={styles.th}>Pit Time</th>
                        <th className={styles.th}>Stint Time</th>
                        <th className={styles.th}>Total Time</th>
                        <th className={styles.th}>Clock Time</th>
                        <th className={styles.th}>Fuel Remaining</th>
                        <th className={styles.th}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {stintData.map((stint) => (
                        <tr key={stint.id} className={styles.tableRow}>
                            <td className={styles.td}>{stint.stintNumber}</td>
                            <td className={`${styles.td} ${styles.driverName}`}>{getDriverName(stint.driverNumber)}</td>
                            <td className={styles.td}>{stint.laps}</td>
                            <td className={styles.td}>
                  <span className={`${styles.weatherBadge} ${getWeatherClass(stint.weather)}`}>
                    {stint.weather.toUpperCase()}
                  </span>
                            </td>
                            <td className={`${styles.td} ${styles.mono}`}>{timeUtils.formatTime(stint.customLaptime)}</td>
                            <td className={styles.td}>{stint.tireChange ? 'YES' : 'NO'}</td>
                            <td className={styles.td}>{stint.fuelToAdd.toFixed(1)}L</td>
                            <td className={`${styles.td} ${styles.mono}`}>{timeUtils.formatTime(stint.pitStopTime)}</td>
                            <td className={`${styles.td} ${styles.mono}`}>{timeUtils.formatTime(stint.stintTime)}</td>
                            <td className={`${styles.td} ${styles.mono} ${styles.totalTime}`}>{timeUtils.formatTime(stint.totalTime)}</td>
                            <td className={`${styles.td} ${styles.mono}`}>{timeUtils.formatClockTime(stint.totalTime, config.raceStart)}</td>                            <td className={`${styles.td} ${stint.isLowFuel ? styles.lowFuel : styles.goodFuel}`}>
                                {stint.fuelRemaining.toFixed(1)}L
                            </td>
                            <td className={styles.td}>
                                <Button
                                    onClick={() => onDeleteStint(stint.id)}
                                    variant="danger"
                                    size="small"
                                >
                                    <Trash2 className={styles.deleteIcon} />
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                    <tfoot>
                    <tr className={styles.totalRow}>
                        <td className={styles.td}>TOTAL</td>
                        <td className={styles.td}>{finalTotalLaps} laps</td>
                        <td className={styles.td}>-</td>
                        <td className={styles.td}>-</td>
                        <td className={styles.td}>-</td>
                        <td className={styles.td}>-</td>
                        <td className={styles.td}>-</td>
                        <td className={styles.td}>-</td>
                        <td className={styles.td}>-</td>
                        <td className={`${styles.td} ${styles.mono}`}>{timeUtils.formatTime(finalTotalTime)}</td>
                        <td className={`${styles.td} ${styles.mono}`}>{timeUtils.formatClockTime(finalTotalTime, config.raceStart)}</td>                        <td className={styles.td}>-</td>
                        <td className={styles.td}>-</td>
                    </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default StintTable;