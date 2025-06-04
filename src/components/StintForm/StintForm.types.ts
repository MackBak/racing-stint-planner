import type { RaceConfig, StintFormData } from '@/types';

export interface StintFormProps {
    config: RaceConfig;
    onAddStint: (stintData: StintFormData) => void;
}