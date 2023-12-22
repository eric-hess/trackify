import { ActivityData, isActivityData } from './ActivityData';
import { ActivityQuickTrackAction, isActivityQuickTrackAction } from './ActivityQuickTrackAction';
import { ActivityAttribute, isActivityAttribute } from './ActivityAttribute';

export interface Activity {
    id: string;
    name: string;
    unit: string;
    data: ActivityData[];
    quickTrackActions: ActivityQuickTrackAction[];
    attributes: ActivityAttribute[];
};

export const isActivity = (activity: Activity): activity is Activity => {
    return Boolean(
        (activity as Activity).id
        && (activity as Activity).name
        && (activity as Activity).unit
        && (activity as Activity).data.filter(e => isActivityData(e) !== true).length === 0
        && (activity as Activity).quickTrackActions.filter(e => isActivityQuickTrackAction(e) !== true).length === 0
        && (activity as Activity).attributes.filter(e => isActivityAttribute(e) !== true).length === 0
    );
};