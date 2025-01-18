import React from 'react';
import { ParentComponent } from '@/types/general';
import { useModeStore } from '@/stores/modeStore';
import { Switch } from '@/components/ui/switch';
import { Label } from "@/components/ui/label"

export const ModeSwitch: ParentComponent = () => {
  const isOptimisticMode = useModeStore(state => state.isOptimisticMode);
  const setMode = useModeStore(state => state.setMode);

  const handleChange = () => {
    setMode(!isOptimisticMode);
  }

  return (
    <div className="relative flex items-center space-x-2">
      <Switch
        id="navigation-mode"
        onCheckedChange={handleChange}
        checked={isOptimisticMode}
      />
      <Label htmlFor="navigation-mode">Optimistic navigation</Label>
    </div>

)
  ;
};

