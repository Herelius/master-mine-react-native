import { useQuery, gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Project } from "../contexts/AppContext";

const ProjectPage = ({ route }: { route: any }): JSX.Element => {
  const [project, setProject] = useState<Project>({
    id: "",
    title: "",
    users: [],
    managers: [],
    dev: [],
    tasks: [],
  });

  useEffect(() => {
    if (route.params.project) {
      setProject(route.params.project);
    }
  }, [route]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.sectionProject}>
        <Text>Titre : </Text>
        <Text>{project.title}</Text>
      </View>

      <View style={styles.sectionProject}>
        <Text>Manager(s) : </Text>
        {project.managers && project.managers.length > 0 ? (
          project.managers.map((manager, index) => {
            return <Text key={index}>{manager.username}</Text>;
          })
        ) : (
          <Text>Aucun</Text>
        )}
      </View>

      <View style={styles.sectionProject}>
        <Text>Développeur(s) : </Text>
        {project.dev && project.dev.length > 0 ? (
          project.dev.map((dev, index) => {
            return <Text key={index}>{dev.username}</Text>;
          })
        ) : (
          <Text>Aucun</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={{ marginBottom: 10 }}>Tâche(s) : </Text>

        <View style={styles.taskContainer}>
          {project.tasks && project.tasks.length > 0 ? (
            project.tasks.map((task, index) => {
              return <Text key={index}>{task.title}</Text>;
            })
          ) : (
            <Text>Aucune tâche associée à ce projet</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  sectionProject: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
  },
  section: {
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
  },
  taskContainer: {
    backgroundColor: "lightgrey",
    borderRadius: 5,
    padding: 10,
  },
});

export default ProjectPage;
