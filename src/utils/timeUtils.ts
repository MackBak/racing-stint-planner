﻿import type { TimeValue } from '@/types';

export const timeUtils = {
    formatTime: (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },

    // TODO: Make the field below adjustable. User needs to be able to change this depending on the race!
    formatClockTime: (totalSeconds: number, startTime: TimeValue): string => {
        let totalSecs = startTime.hours * 3600 + startTime.minutes * 60 + startTime.seconds + totalSeconds;
        const hours = Math.floor(totalSecs / 3600) % 24;
        const minutes = Math.floor((totalSecs % 3600) / 60);
        const secs = totalSecs % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
} as const;