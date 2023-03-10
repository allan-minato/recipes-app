const apiFetch = async (api, endPoint) => {
  const startUrl = `https://www.${api}.com/api/json/v1/1/${endPoint}`;
  const response = await fetch(startUrl);
  const data = await response.json();
  return data;
};

export default apiFetch;
