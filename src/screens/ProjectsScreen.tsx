import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Button,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Card from "../components/Card";
import {
  Dialog,
  IconButton,
  Paragraph,
  Portal,
  Provider,
} from "react-native-paper";
import AddProjectModal from "../components/Project/AddProjectModal";
import { AppContext, Project } from "../contexts/AppContext";
import { gql, useQuery } from "@apollo/client";
import ProjectCard from "../components/Project/ProjectCard";

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

const PROJECTS_DATA = gql`
  query GetProjects {
    getProjects {
      id
      title
      tasks {
        title
        id
      }
      users {
        id
        username
      }
      dev {
        id
        username
      }
      managers {
        id
        username
      }
    }
  }
`;

const ProjectsPage = (): JSX.Element => {
  const [visible, setVisible] = React.useState(false);
  const { user, projects, setProjects } = useContext<any>(AppContext);
  const { data, loading, error } = useQuery(PROJECTS_DATA);

  useEffect(() => {
    if (data) {
      setProjects(data.getProjects);
    }
  }, [data]);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const renderItem = ({ item }: { item: any }) => (
    <Card projectTitle={item.projectTitle} progress={item.progress} />
  );

  return (
    <Provider>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "100%",
          }}
        >
          <TouchableOpacity
            onPress={showDialog}
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Text>Ajouter un project</Text>
            <IconButton
              icon="plus"
              color="blue"
              style={{ backgroundColor: "lightblue" }}
              size={20}
            />
          </TouchableOpacity>
        </View>

        {!loading && projects.length > 0 ? (
          <ScrollView style={styles.projectContainer}>
            {projects.map((project: Project) => {
              return <ProjectCard project={project} key={project.id} />;
            })}
          </ScrollView>
        ) : projects.length > 0 ? (
          <Text>Aucun project en cours</Text>
        ) : (
          <Text>Chargement en cours...</Text>
        )}

        <AddProjectModal hideDialog={hideDialog} visible={visible} />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F0EFEF",
  },
  containerStyle: {
    backgroundColor: "white",
    padding: 20,
  },
  projectContainer: {
    padding: 10,
  },
});

export default ProjectsPage;
