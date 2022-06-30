import { View, Text, Button } from "react-native";
import * as React from "react";
import { Dialog, Paragraph, Portal } from "react-native-paper";
import { request, gql } from "graphql-request";

const AddProjectModal = ({
  hideDialog,
  visible,
}: {
  hideDialog: any;
  visible: boolean;
}) => {
  const addProjectQuery = gql`
    addProject(idUser: $idUser, data: $data) {
      id
      title
    }
  `;

  const handlerAddBtn = async () => {
    try {
      const response = await request({
        url: "http://192.168.0.244:4000/graphql",
        document: addProjectQuery,
        // variables: {
        //   idUser,
        //   data,
        // },
      });
    } catch (err) {
      console.log(err);
    } finally {
      hideDialog();
    }
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Alert</Dialog.Title>
        <Dialog.Content>
          <Paragraph>This is simple dialog</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handlerAddBtn} title="Créer" />
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default AddProjectModal;
