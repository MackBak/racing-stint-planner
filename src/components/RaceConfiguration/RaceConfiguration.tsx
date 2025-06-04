import React, { useState } from 'react';
import { Settings, Gauge } from 'lucide-react';
import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import { timeUtils } from '@/utils/timeUtils';
import type { RaceConfigurationProps } from './RaceConfiguration.types';
import type { RaceConfig, TimeValue } from '@/types';
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

    const updateStartTime = (field: keyof TimeValue, value: number): void => {
        setLocalConfig(prev => ({
            ...prev,
            raceStart: {
                ...prev.raceStart,
                [field]: value
            }
        }));
    };

    // Helper function to format time for display
    const formatStartTime = (startTime: TimeValue): string => {
        return `${startTime.hours.toString().padStart(2, '0')}:${startTime.minutes.toString().padStart(2, '0')}:${startTime.seconds.toString().padStart(2, '0')}`;
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
                        <div className={styles.infoLabel}>Race Start</div>
                        <div>{formatStartTime(config.raceStart)}</div>
                    </div>
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
                    <div className={styles.infoItem}>
                        <div className={styles.infoLabel}>Tire Change</div>
                        <div>{config.tireChangeTime}s</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.editTitle}>Race Configuration</h2>
            <div className={styles.editGrid}>
                {/* Race Start Time Section */}
                <div className={styles.sectionHeader}>
                    <h3 className={styles.sectionTitle}>Race Start Time</h3>
                </div>
                <Input
                    label="Hour (0-23)"
                    type="number"
                    min={0}
                    max={23}
                    value={localConfig.raceStart.hours}
                    onChange={(e) => updateStartTime('hours', Math.max(0, Math.min(23, parseInt(e.target.value) || 0)))}
                />
                <Input
                    label="Minutes (0-59)"
                    type="number"
                    min={0}
                    max={59}
                    value={localConfig.raceStart.minutes}
                    onChange={(e) => updateStartTime('minutes', Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                />
                <Input
                    label="Seconds (0-59)"
                    type="number"
                    min={0}
                    max={59}
                    value={localConfig.raceStart.seconds}
                    onChange={(e) => updateStartTime('seconds', Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                />

                {/* Race Duration and Fuel Section */}
                <div className={styles.sectionHeader}>
                    <h3 className={styles.sectionTitle}>Race & Fuel Settings</h3>
                </div>
                <Input
                    label="Race Duration (seconds)"
                    type="number"
                    min={1}
                    value={localConfig.raceDuration}
                    onChange={(e) => updateConfig('raceDuration', Math.max(1, parseInt(e.target.value) || 0))}
                />
                <Input
                    label="Max Fuel (L)"
                    type="number"
                    step="0.1"
                    min={0.1}
                    value={localConfig.maxFuel}
                    onChange={(e) => updateConfig('maxFuel', Math.max(0.1, parseFloat(e.target.value) || 0))}
                />
                <Input
                    label="Fuel per Lap (L)"
                    type="number"
                    step="0.1"
                    min={0.1}
                    value={localConfig.fuelPerLap}
                    onChange={(e) => updateConfig('fuelPerLap', Math.max(0.1, parseFloat(e.target.value) || 0))}
                />
                <Input
                    label="Fuel Fill Rate (L/s)"
                    type="number"
                    step="0.1"
                    min={0.1}
                    value={localConfig.fuelFillRate}
                    onChange={(e) => updateConfig('fuelFillRate', Math.max(0.1, parseFloat(e.target.value) || 0))}
                />

                {/* Laptime Section */}
                <div className={styles.sectionHeader}>
                    <h3 className={styles.sectionTitle}>Laptime Settings</h3>
                </div>
                <Input
                    label="Dry Laptime (s)"
                    type="number"
                    min={1}
                    value={localConfig.laptimes.dry}
                    onChange={(e) => updateLaptime('dry', Math.max(1, parseInt(e.target.value) || 0))}
                />
                <Input
                    label="Damp Laptime (s)"
                    type="number"
                    min={1}
                    value={localConfig.laptimes.damp}
                    onChange={(e) => updateLaptime('damp', Math.max(1, parseInt(e.target.value) || 0))}
                />
                <Input
                    label="Wet Laptime (s)"
                    type="number"
                    min={1}
                    value={localConfig.laptimes.wet}
                    onChange={(e) => updateLaptime('wet', Math.max(1, parseInt(e.target.value) || 0))}
                />

                {/* Pit Stop Section */}
                <div className={styles.sectionHeader}>
                    <h3 className={styles.sectionTitle}>Pit Stop Settings</h3>
                </div>
                <Input
                    label="Pit Stop Loss (s)"
                    type="number"
                    min={0}
                    value={localConfig.pitStopLoss}
                    onChange={(e) => updateConfig('pitStopLoss', Math.max(0, parseInt(e.target.value) || 0))}
                />
                <Input
                    label="Tire Change Time (s)"
                    type="number"
                    min={0}
                    value={localConfig.tireChangeTime}
                    onChange={(e) => updateConfig('tireChangeTime', Math.max(0, parseInt(e.target.value) || 0))}
                />
            </div>

            {/* Preview Section */}
            <div className={styles.previewSection}>
                <h3 className={styles.previewTitle}>Configuration Preview</h3>
                <div className={styles.previewGrid}>
                    <div className={styles.previewItem}>
                        <span className={styles.previewLabel}>Race Start:</span>
                        <span className={styles.previewValue}>{formatStartTime(localConfig.raceStart)}</span>
                    </div>
                    <div className={styles.previewItem}>
                        <span className={styles.previewLabel}>Duration:</span>
                        <span className={styles.previewValue}>{timeUtils.formatTime(localConfig.raceDuration)}</span>
                    </div>
                    <div className={styles.previewItem}>
                        <span className={styles.previewLabel}>Estimated Finish:</span>
                        <span className={styles.previewValue}>
                            {timeUtils.formatClockTime(localConfig.raceDuration, localConfig.raceStart)}
                        </span>
                    </div>
                    <div className={styles.previewItem}>
                        <span className={styles.previewLabel}>Max Fuel:</span>
                        <span className={styles.previewValue}>{localConfig.maxFuel}L</span>
                    </div>
                    <div className={styles.previewItem}>
                        <span className={styles.previewLabel}>Fuel/Lap:</span>
                        <span className={styles.previewValue}>{localConfig.fuelPerLap}L</span>
                    </div>
                    <div className={styles.previewItem}>
                        <span className={styles.previewLabel}>Max Laps on Full Tank:</span>
                        <span className={styles.previewValue}>
                            {Math.floor(localConfig.maxFuel / localConfig.fuelPerLap)} laps
                        </span>
                    </div>
                </div>
            </div>

            <div className={styles.actions}>
                <Button onClick={handleSave} variant="success">Save Configuration</Button>
                <Button onClick={handleCancel} variant="secondary">Cancel</Button>
            </div>
        </div>
    );
};

export default RaceConfiguration;