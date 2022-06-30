import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProjectPage = (): JSX.Element => {
  return (
    <>
      <View style={styles.container}>
        <Text>Project</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProjectPage;
