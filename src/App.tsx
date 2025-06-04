import React from 'react';
import RaceConfiguration from '@/components/RaceConfiguration';
import StintForm from '@/components/StintForm';
import StintTable from '@/components/StintTable';
import { useRaceConfig } from '@/hooks/useRaceConfig';
import { useStints } from '@/hooks/useStints.ts';
import styles from './App.module.css';

const App: React.FC = () => {
    const { config, updateConfig } = useRaceConfig();
    const { stints, addStint, deleteStint } = useStints();

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <RaceConfiguration
                    config={config}
                    onConfigChange={updateConfig}
                />

                <StintForm
                    config={config}
                    onAddStint={addStint}
                />

                <StintTable
                    stints={stints}
                    config={config}
                    onDeleteStint={deleteStint}
                />
            </div>
        </div>
    );
};

export default App;