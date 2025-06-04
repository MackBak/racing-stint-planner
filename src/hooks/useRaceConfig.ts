import { useState, useCallback } from 'react';
import type { RaceConfig } from '@/types';
import { DEFAULT_CONFIG } from '@/utils/constants';

interface UseRaceConfigReturn {
    config: RaceConfig;
    updateConfig: (newConfig: RaceConfig) => void;
}

export const useRaceConfig = (): UseRaceConfigReturn => {
    const [config, setConfig] = useState<RaceConfig>(DEFAULT_CONFIG);

    const updateConfig = useCallback((newConfig: RaceConfig) => {
        setConfig(newConfig);
    }, []);

    return {
        config,
        updateConfig
    };
};