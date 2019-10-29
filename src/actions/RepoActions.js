export const toggleFavorite = repo => (
    {
      type: 'TOGGLE_FAVORITE',
      payload: repo,
   }
);

export const setFavorites = repos => (
    {
      type: 'SET_FAVORITES',
      payload: repos,
   }
);