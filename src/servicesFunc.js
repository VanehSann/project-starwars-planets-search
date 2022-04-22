export const fetchAPIReturn = async () => {
  const fetchAPI = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const jsonAPI = await fetchAPI.json();
  const { results } = jsonAPI;
  return results;
};

export const selectRemovedA = (column, funcA, funcB, funcC) => {
  if (column === 'population') {
    return funcA(true);
  }
  if (column === 'orbital_period') {
    return funcB(true);
  }
  if (column === 'diameter') {
    return funcC(true);
  }
};
export const selectRemovedB = (column, funcD, funcE) => {
  if (column === 'rotation_period') {
    return funcD(true);
  }
  if (column === 'surface_water') {
    return funcE(true);
  }
};
