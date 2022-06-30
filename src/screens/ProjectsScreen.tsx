import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Button,
  Modal,
  TouchableOpacity,
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
  const [visible, setVisible] = React.useState(false);

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

        <AddProjectModal hideDialog={hideDialog} visible={visible} />

        {/* <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Paragraph>This is simple dialog</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog} title="Done" />
            </Dialog.Actions>
          </Dialog>
        </Portal> */}
      </View>
    </Provider>

    // <Provider>
    //   <View style={styles.container}>

    //     <FlatList
    //       data={data}
    //       renderItem={renderItem}
    //       keyExtractor={(item, index) => `${item}-${index}`}
    //     />
    //   </View>

    //   <Portal>
    //     <Modal
    //       visible={visible}
    //       onDismiss={hideModal}
    //       style={styles.containerStyle}
    //     >
    //       <Text>Example Modal. Click outside this area to dismiss.</Text>
    //     </Modal>
    //   </Portal>
    // </Provider>
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
});

export default ProjectsPage;
