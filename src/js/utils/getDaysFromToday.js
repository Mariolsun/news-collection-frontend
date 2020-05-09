function getDaysFromToday(days = 0) {
  return new Date(Date.now() - days * 24 * 3600 * 1000);
}

export default getDaysFromToday;
