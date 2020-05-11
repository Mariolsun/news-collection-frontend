function wordEndings(numberOfArticles) {
  const wordEnding = {
    saved: 'сохранённых',
    articles: 'новостей',
  };

  let numberEnd = numberOfArticles;
  while (numberEnd > 20) {
    numberEnd %= 10;
  }
  switch (numberEnd) {
    case 1:
      wordEnding.saved = 'сохранённая';
      wordEnding.articles = 'новость';
      break;
    case 2:
    case 3:
    case 4:
      wordEnding.saved = 'сохранённые';
      wordEnding.articles = 'новости';
      break;
    default:
      break;
  }
  return wordEnding;
}

export default wordEndings;
