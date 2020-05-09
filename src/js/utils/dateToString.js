import numToStrMonths from '../constants/numToStrMonths';

function dateToString(dateObj, format) {
  console.log(`dateToString start, date: ${dateObj}`);
  let result = '';
  switch (format) {
    case 'YYYY-MM-DD':
    default:
      result = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
      break;
    case 'pretty':
      result = `${dateObj.getDate()} ${numToStrMonths[dateObj.getMonth()]}, ${dateObj.getFullYear()}`;
  }
  console.log(`result: ${result}`);
  return result;
}

export default dateToString;
