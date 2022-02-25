import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";

const ProfileScreen = (props): JSX.Element => {
  return (
    <>
      <TouchableOpacity
        style={[styles.card, styles.elevation]}
        onPress={() => console.log(props.projectTitle)}
      >
        <View>
          <Text style={styles.cardTitle}>{props.projectTitle}</Text>
        </View>
        <View>
          <Text>Progress</Text>
          <View style={styles.progressBar}>
            <Animated.View
              style={
                ([StyleSheet.absoluteFill],
                { backgroundColor: "#8BED4F", width: `${props.progress}%` })
              }
            />
          </View>
          <Text style={styles.progressValue}>{props.progress}%</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 20,
    paddingHorizontal: 25,
    width: "100%",
    marginVertical: 10,
    borderColor: "#D3D3D3",
  },
  shadowProp: {
    shadowColor: "#9F9F9F",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  elevation: {
    elevation: 20,
    shadowColor: "#52006A",
  },
  cardTitle: {
    fontSize: 25,
    padding: 10,
  },
  progressBar: {
    height: 20,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "white",
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 5,
  },
  progressValue: {
    alignSelf: "center",
  },
});

export default ProfileScreen;
