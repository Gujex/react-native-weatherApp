import React from "react";
import ModalList from "./Modal";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

function Card({ city, key }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <View key={key} style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.title}>{city.name}</Text>
        <Text style={styles.text}>Today</Text>
        <Text style={styles.weatherNum}>
          {(city.current.temp - 273.15).toFixed(0)}°C
        </Text>
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
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

        {showModal && <ModalList setShowModal={setShowModal} city={city} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    margin: 25,
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

export default Card;
