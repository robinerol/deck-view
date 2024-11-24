const cardApi = {
  async fetchPlaySetData(playSets: Set<string>): Promise<any> {
    const response = await fetch('https://api.scryfall.com/cards/collection', {
      method: 'POST',
      headers: {
        Accept: 'application/json;q=0.9,*/*;q=0.8',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifiers: [...playSets].map((identifier) => ({ name: identifier })),
      }),
    });

    if (!response.ok) {
      throw new Error(`Request to API failed! Status: ${response.status}.`);
    }

    return await response.json();
  },
};

export { cardApi };
