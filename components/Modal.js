import React from "react";
import { timeConverter, weekDayConverter } from "../utils/converter";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";

function ModalList({ city, setShowModal }) {
  return (
    <Modal style={{ height: 500 }} visible={true} transparent={true}>
      <View
        style={{
          backgroundColor: "'rgba(52, 52, 52, 0.6)'",
          flex: 1,
        }}
      >
        <ScrollView style={styles.scrollView}>
          {city.daily.map((eachDay, index) => {
            return (
              <View key={index}>
                <View style={styles.mainView}>
                  <View style={styles.listView}>
                    <Text
                      style={{
                        color: "yellow",
                        fontSize: 30,
                      }}
                    >
                      {(eachDay.temp.day - 273.15).toFixed(0)}°C
                    </Text>
                    <Text style={{ fontSize: 18, color: "white" }}>
                      {weekDayConverter(eachDay.dt)}
                    </Text>
                    <Text style={{ fontSize: 12, color: "white" }}>
                      {timeConverter(eachDay.dt)}
                    </Text>
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
            >
              <Text style={styles.closeModalText}>Close modal</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: "#2d2dbb",
    margin: 10,
    padding: 20,
    borderRadius: 10,
  },
  scrollView: {
    backgroundColor: "#15153c",
    padding: 5,
    margin: 20,
    borderRadius: 10,
  },
  listView: {
    color: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeModalText: {
    fontSize: 18,
    color: "black",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
  },
});

export default ModalList;
