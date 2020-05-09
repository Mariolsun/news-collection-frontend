import numToStrMonths from '../constants/numToStrMonths';

function dateToString(dateObj, format) {
  let result = '';
  switch (format) {
    case 'YYYY-MM-DD':
    default:
      result = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
      break;
    case 'pretty':
      result = `${dateObj.getDate()} ${numToStrMonths[dateObj.getMonth()]}, ${dateObj.getFullYear()}`;
  }
  return result;
}

export default dateToString;
