import type { StintData, RaceConfig } from '@/types';

export interface StintTableProps {
    stints: StintData[];
    config: RaceConfig;
    onDeleteStint: (stintId: number) => void;
}