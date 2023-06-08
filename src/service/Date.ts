import dayjs from 'dayjs';

export const localizedFormat = 'MMM D, YYYY HH:mm';

export const formatFromString = (date?: string, format?: string): string => {
    return dayjs(date).format(format);
};

export const getDateString = (date?: string): string => {
    return dayjs(date).format('YYYY-MM-DD');
};

export const compare = (a: string, b: string): number => {
    return dayjs(a).format().localeCompare(dayjs(b).format());
};

export const calculateDaysBetween = (a: string, b: string): number => {
    return dayjs(a).diff(dayjs(b), 'days');
};

export const addDays = (date: string, days: number): string => {
    return dayjs(date).add(days, 'days').format();
};