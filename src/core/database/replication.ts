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

export const pushTagQueryBuilder = (doc: any) => {
  const query = `
    mutation SyncTag($tag:SyncTagInput!) {
      syncTag(tag:$tag) {
        name
      }
    }
  `;

  delete doc._deleted;

  const variables = {
    tag: doc,
  };

  return {
    query,
    variables,
  };
};

export const pullTagsQueryBuilder = (doc: any) => {
  const query = `
    query FeedTags($input:FeedTagsInput!) {
      feedTags(input:$input) {
        rxId
        name
        wordIds
        updatedAt
        deleted
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
