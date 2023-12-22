export interface ActivityDataAttribute {
    activityAttributeId: string;
    value: any;
};

export const isActivityDataAttribute = (activityDataAttribute: ActivityDataAttribute): activityDataAttribute is ActivityDataAttribute => {
    return Boolean(
        (activityDataAttribute as ActivityDataAttribute).activityAttributeId
        && (activityDataAttribute as ActivityDataAttribute).value
    );
};