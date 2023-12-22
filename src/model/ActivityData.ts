import {ActivityDataAttribute, isActivityDataAttribute} from './ActivityDataAttribute';

export interface ActivityData {
    id: string;
    date: string;
    amount: number;
    attributes: ActivityDataAttribute[];
};

export const isActivityData = (activityData: ActivityData): activityData is ActivityData => {
    return Boolean(
        (activityData as ActivityData).id
        && (activityData as ActivityData).date
        && !isNaN((activityData as ActivityData).amount)
        && (activityData as ActivityData).attributes.filter(e => isActivityDataAttribute(e) !== true).length === 0
    );
};