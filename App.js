import { useEffect, useState } from "react";
// import moment from 'moment-timezone'

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const API_KEY = "360ea5bf9b23e8db36401f153257b7e5";

// Celsius = (Kelvin – 273.15) კონვერტიაცია

export default function App() {
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [showModal, setShowModal] = useState(false);

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

    // console.log(timeConverter(1643360400));
  }, []);
  return (
    <ScrollView style={{ backgroundColor: "#060827" }}>
      {cities.map((city) => {
        // console.log(city);
        return (
          <View key={city.lat} style={styles.root}>
            <View style={styles.container}>
              <Text style={styles.title}>{city.name}</Text>
              <Text style={styles.text}>Today</Text>
              <Text style={styles.weatherNum}>
                {(city.current.temp - 273.15).toFixed(0)}°C
              </Text>
              {/* {moment.tz(city.current.sunset * 1000, timezone).format("HH:mm")} */}
              <Text></Text>
              <TouchableOpacity
                onPress={() => setShowModal(true)}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
                // onPress={onPress}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: "white",
                    backgroundColor: "#16180a",
                    padding: 8,
                    borderRadius: 10,
                  }}
                >
                  See 7 day forecast
                </Text>
              </TouchableOpacity>

              {showModal && (
                <Modal
                  style={{ height: 500 }}
                  visible={true}
                  transparent={true}
                >
                  <View
                    style={{
                      backgroundColor: "'rgba(52, 52, 52, 0.6)'",
                      flex: 1,
                    }}
                  >
                    <ScrollView
                      style={{
                        backgroundColor: "#15153c",
                        padding: 5,
                        margin: 20,
                        borderRadius: 10,
                      }}
                    >
                      {city.daily.map((eachDay, index) => {
                        function timeConverter(UNIX_timestamp) {
                          const date = new Date(UNIX_timestamp * 1000);

                          const months = [
                            "Jan",
                            "Feb",
                            "Mar",
                            "Apr",
                            "May",
                            "Jun",
                            "Jul",
                            "Aug",
                            "Sep",
                            "Oct",
                            "Nov",
                            "Dec",
                          ];
                          const year = date.getFullYear();
                          const month = months[date.getMonth()];
                          const day = date.getDate();

                          const time = day + " " + month + " " + year;

                          return time;
                        }

                        function weekDayConverter(UNIX) {
                          const date = new Date(UNIX * 1000);
                          const weekDay = [
                            "Sun",
                            "Mon",
                            "Tue",
                            "Wed",
                            "Thu",
                            "Fri",
                            "Sat",
                          ];

                          return weekDay[date.getDay()];
                        }
                        const date = new Date();
                        return (
                          <View key={index}>
                            <View
                              style={{
                                backgroundColor: "#2d2dbb",
                                margin: 10,
                                padding: 20,
                                fontSize: 20,
                                borderRadius: 10
                              }}
                            >
                              <View style={{ color: "white", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text
                                  style={{
                                    color: "yellow",
                                    fontSize: 30,
                                   
                                  }}
                                >
                                  {(eachDay.temp.day - 273.15).toFixed(0)}°C
                                </Text>
                                <Text style={{fontSize: 18, color: 'white'}}>{weekDayConverter(eachDay.dt)}</Text>
                                <Text style={{fontSize: 12, color: 'white'}}>{timeConverter(eachDay.dt)}</Text>

                              </View>
                            </View>
                          </View>
                        );
                      })}
                      <View
                        style={{
                          height: 100,
                          justifyContent: "space-between",
                          margin: 10,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => setShowModal(false)}
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          // onPress={onPress}
                        >
                          <Text
                            style={{
                              fontSize: 18,
                              color: "black",
                              backgroundColor: "white",
                              padding: 15,
                              borderRadius: 10,
                            }}
                          >
                            Close modal
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </ScrollView>
                  </View>
                </Modal>
              )}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    marginTop: 50,
  },
  container: {
    justifyContent: "space-between",
    padding: 20,
    width: 300,
    alignItems: "center",
    backgroundColor: "#1a81e0",
    height: 300,
    borderRadius: 40,
  },
  title: {
    fontSize: 20,
    color: "white",
  },
  weatherNum: {
    fontSize: 90,
    color: "#fff",
    marginBottom: 30,
  },
  text: {
    fontSize: 24,
    color: "white",
  },
  modal: {},
});
