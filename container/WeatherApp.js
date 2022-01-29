import React from "react";
import Card from "../components/Card";
import { View, ScrollView } from "react-native";

function WeatherApp({cities}) {
  return (
    <ScrollView style={{ backgroundColor: "#060827" }}>
      {cities.map((city) => {
        return (
          <View key={city.lat}>
            <Card city={city} />
          </View>
        );
      })}
    </ScrollView>
  );
}

export default WeatherApp;
