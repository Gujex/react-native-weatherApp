import { useEffect, useState } from "react";
import Card from "./components/UI/Card";
import { ScrollView } from "react-native";

const API_KEY = "360ea5bf9b23e8db36401f153257b7e5";

export default function App() {
  const [cities, setCities] = useState([]);

  const states = {
    tbilisi: {
      lat: 41.716667,
      lon: 44.783333,
    },
    batumi: {
      lat: 41.643414,
      lon: 41.6399,
    },
    kutaisi: {
      lat: 42.2692,
      lon: 42.7115,
    },
  };

  const fetchData = async (lat, lon) => {
    const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    try {
      let response = await fetch(URL);
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function setData() {
      const tbilisi = await fetchData(states.tbilisi.lat, states.tbilisi.lon);
      tbilisi.name = "Tbilisi";
      const batumi = await fetchData(states.batumi.lat, states.batumi.lon);
      batumi.name = "Batumi";
      const kutaisi = await fetchData(states.kutaisi.lat, states.kutaisi.lon);
      kutaisi.name = "Kutaisi";

      setCities([tbilisi, batumi, kutaisi]);
    }
    setData();
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "#060827" }}>
      {cities.map((city) => {
        return <Card key={city.lat} city={city} />;
      })}
    </ScrollView>
  );
}
