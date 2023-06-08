export interface ActivityData {
    id: string;
    date: string;
    amount: number;
};

export const isActivityData = (activityData: ActivityData): activityData is ActivityData => {
    return Boolean(
        (activityData as ActivityData).id
        && (activityData as ActivityData).date
        && !isNaN((activityData as ActivityData).amount)
    );
};