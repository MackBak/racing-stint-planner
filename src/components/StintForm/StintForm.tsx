import React, { useState } from 'react';
import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import Select from '@/components/UI/Select';
import { DRIVERS, WEATHER_CONDITIONS } from '@/utils/constants';
import type { StintFormProps } from './StintForm.types';
import type { StintFormData, WeatherCondition, SelectOption } from '@/types';
import styles from './StintForm.module.css';

const StintForm: React.FC<StintFormProps> = ({ config, onAddStint }) => {
    const [formData, setFormData] = useState<StintFormData>({
        driverNumber: 1,
        laps: 8,
        weather: WEATHER_CONDITIONS.DRY,
        customLaptime: config.laptimes.dry,
        tireChange: false,
        fuelToAdd: config.maxFuel
    });

    const driverOptions: SelectOption<number>[] = DRIVERS.map(driver => ({
        value: driver.id,
        label: driver.name
    }));

    const weatherOptions: SelectOption<WeatherCondition>[] = [
        { value: WEATHER_CONDITIONS.DRY, label: 'Dry' },
        { value: WEATHER_CONDITIONS.DAMP, label: 'Damp' },
        { value: WEATHER_CONDITIONS.WET, label: 'Wet' }
    ];

    const tireChangeOptions: SelectOption<boolean>[] = [
        { value: false, label: 'No' },
        { value: true, label: 'Yes' }
    ];

    const handleSubmit = (): void => {
        if (formData.laps <= 0) {
            alert('Please enter a valid number of laps');
            return;
        }
        if (formData.customLaptime <= 0) {
            alert('Please enter a valid laptime');
            return;
        }

        onAddStint(formData);

        // Reset form with smart defaults
        setFormData({
            driverNumber: formData.driverNumber,
            laps: 8,
            weather: WEATHER_CONDITIONS.DRY,
            customLaptime: config.laptimes.dry,
            tireChange: false,
            fuelToAdd: Math.min(config.maxFuel, Math.ceil(8 * config.fuelPerLap))
        });
    };

    const handleWeatherChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const weather = e.target.value as WeatherCondition;
        setFormData(prev => ({
            ...prev,
            weather,
            customLaptime: config.laptimes[weather]
        }));
    };

    const handleLapsChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const laps = parseInt(e.target.value) || 1;
        const suggestedFuel = Math.min(config.maxFuel, Math.ceil(laps * config.fuelPerLap));
        setFormData(prev => ({
            ...prev,
            laps,
            fuelToAdd: suggestedFuel
        }));
    };

    const updateFormField = <K extends keyof StintFormData>(
        field: K,
        value: StintFormData[K]
    ): void => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Add New Stint</h2>
            <div className={styles.form}>
                <Select
                    label="Driver"
                    value={formData.driverNumber}
                    onChange={(e) => updateFormField('driverNumber', parseInt(e.target.value))}
                    options={driverOptions}
                />

                <Input
                    label="Laps"
                    type="number"
                    min={1}
                    value={formData.laps}
                    onChange={handleLapsChange}
                />

                <Select
                    label="Weather"
                    value={formData.weather}
                    onChange={handleWeatherChange}
                    options={weatherOptions}
                />

                <Input
                    label="Laptime (s)"
                    type="number"
                    min={300}
                    max={900}
                    value={formData.customLaptime}
                    onChange={(e) => updateFormField('customLaptime', parseInt(e.target.value) || 300)}
                />

                <Select
                    label="Tire Change"
                    value={formData.tireChange}
                    onChange={(e) => updateFormField('tireChange', e.target.value === 'true')}
                    options={tireChangeOptions}
                />

                <Input
                    label="Fuel to Add (L)"
                    type="number"
                    min={0}
                    max={config.maxFuel}
                    step="0.1"
                    value={formData.fuelToAdd}
                    onChange={(e) => updateFormField('fuelToAdd', parseFloat(e.target.value) || 0)}
                />

                <div className={styles.submitContainer}>
                    <Button onClick={handleSubmit} variant="primary">
                        Add Stint
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default StintForm;