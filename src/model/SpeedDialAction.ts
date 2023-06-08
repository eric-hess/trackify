import * as React from 'react';

export interface SpeedDialAction {
    id: string;
    icon: React.ReactNode;
    tooltip: string;
    onClick: () => void;
};