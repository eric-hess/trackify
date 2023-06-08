import { ActivityData, isActivityData } from './ActivityData';
import { ActivityQuickTrackAction, isActivityQuickTrackAction } from './ActivityQuickTrackAction';

export interface Activity {
    id: string;
    name: string;
    unit: string;
    data: ActivityData[];
    quickTrackActions: ActivityQuickTrackAction[];
};

export const isActivity = (actvitiy: Activity): actvitiy is Activity => {
    return Boolean(
        (actvitiy as Activity).id
        && (actvitiy as Activity).name
        && (actvitiy as Activity).unit
        && (actvitiy as Activity).data.filter(e => isActivityData(e) !== true).length === 0
        && (actvitiy as Activity).quickTrackActions.filter(e => isActivityQuickTrackAction(e) !== true).length === 0
    );
};