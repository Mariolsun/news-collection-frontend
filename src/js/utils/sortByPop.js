function sortByPop(arr) {
  let resArr = arr.sort((a, b) => {
    const resultA = arr.reduce((prevCount, currKey) => (a === currKey ? prevCount + 1 : prevCount), 0);
    const resultB = arr.reduce((prevCount, currKey) => (b === currKey ? prevCount + 1 : prevCount), 0);
    return resultB - resultA;
  });
  resArr = resArr.filter((keyword, i) => !arr.includes(keyword, i + 1));
  return resArr;
}

export default sortByPop;
