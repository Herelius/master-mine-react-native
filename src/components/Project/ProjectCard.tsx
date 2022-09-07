import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Project } from "../../contexts/AppContext";
import { useNavigation } from "@react-navigation/native";

export const ProjectCard = ({ project }: { project: Project }) => {
  const navigation: any = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Project", { project: project })}
      style={styles.card}
    >
      <Text>{project.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 80,
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
});
