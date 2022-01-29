const API_KEY = "360ea5bf9b23e8db36401f153257b7e5";

export const fetchData = async (lat, lon) => {
  const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  try {
    let response = await fetch(URL);
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
