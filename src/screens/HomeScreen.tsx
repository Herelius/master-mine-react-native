import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import * as React from "react";
import { Card, Title, Paragraph } from "react-native-paper";

const placeholder = [
  {
    id: 1,
    title: "Project Arcos",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: 2,
    title: "Loic",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    title: "Hugo",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo",
  },
  {
    id: 4,
    title: "Frogy le cafard",
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident",
  },
  {
    id: 5,
    title: "Dog dog",
    description:
      "Nunc eu turpis mattis ante dapibus interdum non sit amet mauris. Nunc pharetra et sapien sit amet vestibulum.",
  },
];

const HomeScreen = () => {
  const renderItem = ({ item }: any) => {
    return (
      <Card key={item.id}>
        <Card.Content>
          <Title>{item.title}</Title>
          <Paragraph>{item.description}</Paragraph>
        </Card.Content>
      </Card>
    );
  };
  return (
    <>
      <View style={styles.homeContainer}>
        <Text style={styles.newsTitle}>News</Text>
      </View>
      <SafeAreaView style={styles.cardContainer}>
        <FlatList
          data={placeholder}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id}
        />
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 0,
  },
  newsTitle: {
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
    borderBottomWidth: 1,
  },
  cardContainer: {
    flex: 1,
  },
});
