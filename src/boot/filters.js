import {date as QDate} from 'quasar';

export default ({Vue}) => {
  Vue.filter('formatDateSingleAPI', date => QDate.formatDate(date, 'YYYY-MM-DD'));
  Vue.filter('formatDate', (dateStart, dateEnd) => {
    if (QDate.isSameDate(dateStart, dateEnd, 'day')) {
      return QDate.formatDate(dateStart, 'DD-MMM-YY');
    }
    return `${QDate.formatDate(dateStart, 'DD-MMM-YY')} - ${QDate.formatDate(dateEnd, 'DD-MMM-YY')}`;
  });
  Vue.filter('time', date => QDate.formatDate(date, 'HH:mm:ss'));

  // Refer to https://stackoverflow.com/questions/2685911/is-there-a-way-to-round-numbers-into-a-reader-friendly-format-e-g-1-1k
  Vue.filter('pretty', (num = 0, decimals = 1) => {
    if (num < 1000) return num;
    let c = String(num).length;
    decimals = 10 ** decimals;
    return ((num * decimals / (10 ** (c -= c % 3))) | 0) / decimals + ' kMGTPE'[c / 3];
  });

  Vue.filter('FilterDate', (data, dataStart, dataEnd, isAll = false) => {
    if (isAll) return data;

    return data.filter(d => {
      const newDate = new Date(d.date).setHours(0, 0, 0, 0);
      const dateFrom = new Date(dataStart.setHours(0, 0, 0, 0));
      const dateTo = new Date(dataEnd.setHours(0, 0, 0, 0));
      return QDate.isBetweenDates(newDate, dateFrom, dateTo, {inclusiveFrom: true, inclusiveTo: true});
    });
  });
};
