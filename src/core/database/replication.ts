export const pushWordsQueryBuilder = (doc: any) => {
  const query = `
    mutation SyncWord($word:SyncWordInput!) {
      syncWord(word:$word) {
        word
      }
    }`;
  delete doc._deleted;
  const variables = {
    word: doc,
  };
  return {
    query,
    variables,
  };
};

export const pullWordsQueryBuilder = (doc: any) => {
  const query = `
    query FeedWords($input:FeedWordsInput!) {
      feedWords(input:$input) {
        rxId
        word
        meaning
        deleted
        updatedAt
      }
    }
  `;

  const variables = {
    input: {
      minUpdatedAt: doc?.updatedAt || '2000-01-01',
      limit: 10,
    },
  };

  return {
    query,
    variables,
  };
};
