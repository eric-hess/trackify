export enum ActivityAttributeType {
    Number,
    Text
}

export interface ActivityAttribute {
    id: string;
    name: string;
    type: ActivityAttributeType;
}

export const isActivityAttribute = (activityAttribute: ActivityAttribute): activityAttribute is ActivityAttribute => {
    return Boolean(
        (activityAttribute as ActivityAttribute).id
        && (activityAttribute as ActivityAttribute).name
        && (activityAttribute as ActivityAttribute).type
    );
}