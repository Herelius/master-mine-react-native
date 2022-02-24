import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProjectsPage = (): JSX.Element => {
  return (
    <>
      <View style={styles.container}>
        <Text>List of projects</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default ProjectsPage