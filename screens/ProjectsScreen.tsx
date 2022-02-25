import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Card from "../components/Card";

const data = [
  {
    id: 1,
    projectTitle: "Dodo",
    progress: "30",
  },
  {
    id: 2,
    projectTitle: "War Horse",
    progress: "60",
  },
  {
    id: 3,
    projectTitle: "Horse Traveler",
    progress: "69",
  },
  {
    id: 4,
    projectTitle: "Letter",
    progress: "10",
  },
  {
    id: 5,
    projectTitle: "Jelly Fish",
    progress: "96",
  },
  {
    id: 6,
    projectTitle: "Kebab destroyer",
    progress: "1",
  },
];

const ProjectsPage = (): JSX.Element => {
  const renderItem = ({ item }) => (
    <Card projectTitle={item.projectTitle} progress={item.progress} />
  );
  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F0EFEF",
  },
});

export default ProjectsPage;
