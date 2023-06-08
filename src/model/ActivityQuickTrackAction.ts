export interface ActivityQuickTrackAction {
    id: string;
    text: string;
    amount: number;
};

export const isActivityQuickTrackAction = (activityQuickTrackAction: ActivityQuickTrackAction): activityQuickTrackAction is ActivityQuickTrackAction => {
    return Boolean(
        (activityQuickTrackAction as ActivityQuickTrackAction).id
        && (activityQuickTrackAction as ActivityQuickTrackAction).text
        && !isNaN((activityQuickTrackAction as ActivityQuickTrackAction).amount)
    );
};