import { useState, useCallback } from 'react';
import type { StintData, StintFormData } from '@/types';

interface UseStintsReturn {
  stints: StintData[];
  addStint: (stintData: StintFormData) => void;
  deleteStint: (stintId: number) => void;
  clearStints: () => void;
}

export const useStints = (): UseStintsReturn => {
  const [stints, setStints] = useState<StintData[]>([]);

  const addStint = useCallback((stintData: StintFormData) => {
    const newStint: StintData = {
      id: Date.now(),
      ...stintData
    };
    setStints(prev => [...prev, newStint]);
  }, []);

  const deleteStint = useCallback((stintId: number) => {
    setStints(prev => prev.filter(stint => stint.id !== stintId));
  }, []);

  const clearStints = useCallback(() => {
    setStints([]);
  }, []);

  return {
    stints,
    addStint,
    deleteStint,
    clearStints
  };
};