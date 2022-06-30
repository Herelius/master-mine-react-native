import { View, Text, Button } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Dialog, Paragraph, Portal, TextInput } from "react-native-paper";
import { gql, useMutation } from "@apollo/client";
import { AppContext } from "../../contexts/AppContext";

const ADD_PROJECT = gql`
  mutation AddProject($idUser: ID!, $data: ProjectInput!) {
    addProject(idUser: $idUser, data: $data) {
      id
      title
    }
  }
`;

const AddProjectModal = ({
  hideDialog,
  visible,
}: {
  hideDialog: any;
  visible: boolean;
}) => {
  const { user } = useContext<any>(AppContext);
  const [AddProject, { data, loading, error }] = useMutation(ADD_PROJECT);
  const [title, setTitle] = useState("");

  useEffect(() => {
    console.log(user);
  }, []);

  const handleAddBtn = async () => {
    const userId = user.id;
    try {
      await AddProject({
        variables: { userId, title },
        onCompleted(result) {
          console.log(result);
          hideDialog();
        },
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
        <Dialog.Title>Créer un projet</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Titre"
            autoComplete={false}
            mode="outlined"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleAddBtn} title="Valider" />
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default AddProjectModal;
