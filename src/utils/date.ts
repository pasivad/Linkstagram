import moment from 'moment';

export const getDateValues = (date: Date) => {
  return {
    years: moment().diff(date, 'years'),
    months: moment().diff(date, 'months'),
    days: moment().diff(date, 'days'),
    hours: moment().diff(date, 'hours'),
    minutes: moment().diff(date, 'minutes'),
    seconds: moment().diff(date, 'seconds') || 1,
  };
};
