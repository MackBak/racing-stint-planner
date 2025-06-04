import type { RaceConfig } from '@/types';

export interface RaceConfigurationProps {
    config: RaceConfig;
    onConfigChange: (config: RaceConfig) => void;
}