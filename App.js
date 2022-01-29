import { useEffect, useState } from "react";
import { fetchData } from "./utils/api";
import WeatherApp from "./container/WeatherApp";
import { locations } from "./utils/locations";

export default function App() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    async function setData() {
      const tbilisi = await fetchData(locations.tbilisi.lat, locations.tbilisi.lon);
      tbilisi.name = "Tbilisi";
      const batumi = await fetchData(locations.batumi.lat, locations.batumi.lon);
      batumi.name = "Batumi";
      const kutaisi = await fetchData(locations.kutaisi.lat, locations.kutaisi.lon);
      kutaisi.name = "Kutaisi";

      setCities([tbilisi, batumi, kutaisi]);
    }
    setData();
  }, []);

  return <WeatherApp cities={cities} />;
}
