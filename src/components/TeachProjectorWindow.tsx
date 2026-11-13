import React, { useEffect, useState } from 'react';
import { MonitorPlay } from 'lucide-react';
import {
  loadSavedProjectorState,
  subscribeProjectorState,
  ProjectorSyncState
} from '../services/teachSyncService';
import { TeachProjectorStage } from './TeachProjectorStage';

export const TeachProjectorWindow: React.FC = () => {
  const [syncState, setSyncState] = useState<ProjectorSyncState | null>(() =>
    loadSavedProjectorState()
  );

  useEffect(() => {
    const unsub = subscribeProjectorState((next) => {
      setSyncState(next);
    });
    return unsub;
  }, []);

  if (!syncState || !syncState.isOpen) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center p-6">
        <div className="max-w-md w-full p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
          <MonitorPlay className="w-10 h-10 text-sky-400 mx-auto" />
          <h1 className="text-xl font-bold text-white">
            Waiting for Teacher Control Console
          </h1>
          <p className="text-sm text-slate-400">
            Open “Teach in English” on the teacher screen in this browser to start projecting synchronized English content here.
          </p>
        </div>
      </div>
    );
  }

  return <TeachProjectorStage state={syncState} fullscreen />;
};
