import React, { useState } from 'react';
import { Settings, Gauge } from 'lucide-react';
import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import { timeUtils } from '@/utils/timeUtils';
import type { RaceConfigurationProps } from './RaceConfiguration.types';
import type { RaceConfig } from '@/types';
import styles from './RaceConfiguration.module.css';

const RaceConfiguration: React.FC<RaceConfigurationProps> = ({ config, onConfigChange }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [localConfig, setLocalConfig] = useState<RaceConfig>(config);

    const handleSave = (): void => {
        onConfigChange(localConfig);
        setIsEditing(false);
    };

    const handleCancel = (): void => {
        setLocalConfig(config);
        setIsEditing(false);
    };

    const updateConfig = <K extends keyof RaceConfig>(
        key: K,
        value: RaceConfig[K]
    ): void => {
        setLocalConfig(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const updateLaptime = (weather: keyof RaceConfig['laptimes'], value: number): void => {
        setLocalConfig(prev => ({
            ...prev,
            laptimes: {
                ...prev.laptimes,
                [weather]: value
            }
        }));
    };

    if (!isEditing) {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>
                        <Gauge className={styles.icon} />
                        Racing Stint Planner
                    </h1>
                    <Button
                        onClick={() => setIsEditing(true)}
                        variant="primary"
                        size="small"
                    >
                        <Settings className={styles.settingsIcon} />
                        Configure
                    </Button>
                </div>
                <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                        <div className={styles.infoLabel}>Race Duration</div>
                        <div>{timeUtils.formatTime(config.raceDuration)}</div>
                    </div>
                    <div className={styles.infoItem}>
                        <div className={styles.infoLabel}>Max Fuel</div>
                        <div>{config.maxFuel}L</div>
                    </div>
                    <div className={styles.infoItem}>
                        <div className={styles.infoLabel}>Fuel/Lap</div>
                        <div>{config.fuelPerLap}L</div>
                    </div>
                    <div className={styles.infoItem}>
                        <div className={styles.infoLabel}>Dry Laptime</div>
                        <div>{timeUtils.formatTime(config.laptimes.dry)}</div>
                    </div>
                    <div className={styles.infoItem}>
                        <div className={styles.infoLabel}>Damp Laptime</div>
                        <div>{timeUtils.formatTime(config.laptimes.damp)}</div>
                    </div>
                    <div className={styles.infoItem}>
                        <div className={styles.infoLabel}>Wet Laptime</div>
                        <div>{timeUtils.formatTime(config.laptimes.wet)}</div>
                    </div>
                    <div className={styles.infoItem}>
                        <div className={styles.infoLabel}>Pit Loss</div>
                        <div>{config.pitStopLoss}s</div>
                    </div>
                    <div className={styles.infoItem}>
                        <div className={styles.infoLabel}>Fuel Rate</div>
                        <div>{config.fuelFillRate}L/s</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.editTitle}>Race Configuration</h2>
            <div className={styles.editGrid}>
                <Input
                    label="Race Duration (seconds)"
                    type="number"
                    value={localConfig.raceDuration}
                    onChange={(e) => updateConfig('raceDuration', parseInt(e.target.value) || 0)}
                />
                <Input
                    label="Max Fuel (L)"
                    type="number"
                    step="0.1"
                    value={localConfig.maxFuel}
                    onChange={(e) => updateConfig('maxFuel', parseFloat(e.target.value) || 0)}
                />
                <Input
                    label="Fuel per Lap (L)"
                    type="number"
                    step="0.1"
                    value={localConfig.fuelPerLap}
                    onChange={(e) => updateConfig('fuelPerLap', parseFloat(e.target.value) || 0)}
                />
                <Input
                    label="Dry Laptime (s)"
                    type="number"
                    value={localConfig.laptimes.dry}
                    onChange={(e) => updateLaptime('dry', parseInt(e.target.value) || 0)}
                />
                <Input
                    label="Damp Laptime (s)"
                    type="number"
                    value={localConfig.laptimes.damp}
                    onChange={(e) => updateLaptime('damp', parseInt(e.target.value) || 0)}
                />
                <Input
                    label="Wet Laptime (s)"
                    type="number"
                    value={localConfig.laptimes.wet}
                    onChange={(e) => updateLaptime('wet', parseInt(e.target.value) || 0)}
                />
                <Input
                    label="Pit Stop Loss (s)"
                    type="number"
                    value={localConfig.pitStopLoss}
                    onChange={(e) => updateConfig('pitStopLoss', parseInt(e.target.value) || 0)}
                />
                <Input
                    label="Fuel Fill Rate (L/s)"
                    type="number"
                    step="0.1"
                    value={localConfig.fuelFillRate}
                    onChange={(e) => updateConfig('fuelFillRate', parseFloat(e.target.value) || 0)}
                />
                <Input
                    label="Tire Change Time (s)"
                    type="number"
                    value={localConfig.tireChangeTime}
                    onChange={(e) => updateConfig('tireChangeTime', parseInt(e.target.value) || 0)}
                />
            </div>
            <div className={styles.actions}>
                <Button onClick={handleSave} variant="success">Save</Button>
                <Button onClick={handleCancel} variant="secondary">Cancel</Button>
            </div>
        </div>
    );
};

export default RaceConfiguration;