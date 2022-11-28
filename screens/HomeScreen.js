import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import CommentInput from "../components/CommentInput";
import CommentItem from "../components/CommentItem";

export function HomeScreen({ route, navigation }) {
  //deklaracija state varjable
  const [comment, setComment] = useState([]);

  //uzima vrijednost koju smo unijeli u textInput i dodaje istu u niz, dodjeljuje id (generirani) i value (vrijednost koju upišemo u textInput)
  const addCommentHandler = (commentTitle) => {
    setComment((currentComment) => [
      ...currentComment,
      { id: Math.random().toString(), value: commentTitle },
    ]);
  };

  //uzima id vrijednosti na koju smo kliknuli i briše tu vrijednost iz niza
  const removeCommentHandler = (commentId) => {
    setComment((currentComment) => {
      return currentComment.filter((comment) => comment.id !== commentId);
    });
  };
  function handleHomePress() {
    navigation.navigate("Home");
  }
  return (
    <View style={styles.container}>
      <View style={styles.gameResultJubotron}>
        <View style={styles.gameResultWrapper}>
          <Image
            source={{
              uri: 'https://cdn.britannica.com/70/5070-050-8968E7E7/Flag-Senegal.jpg',
            }}
            style={{ width: 150, height: 100 }}
          />
          <Text style={styles.gameResult}>1</Text>
        </View>
        <View style={styles.gameResultWrapper}>
          <Text style={styles.gameResult}>:</Text>
        </View>
        <View style={styles.gameResultWrapper}>
          <Text style={styles.gameResult}>0</Text>
          <Image
            source={{
             uri: 'https://www.osculati.com/SupplyImages/WF-0040/Bandiera_olanda_paesi-bassi.jpg',
            }}
            style={{ width: 150, height: 100 }}
          />
        </View>
      </View>

      <View style={styles.gameCommentsJubotron}>
        <CommentInput onAddComment={addCommentHandler} />
        <FlatList
          keyExtractor={(item, index) => item.id}
          data={comment}
          renderItem={(itemData) => (
            <CommentItem
              id={itemData.item.id}
              onDelete={removeCommentHandler}
              title={itemData.item.value}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  gameResultJubotron: {
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    borderBottomColor: "black",
    borderBottomWidth: 2,
    paddingBottom: 20,
  },
  gameResultWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  gameResult: {
    fontSize: 30,
    fontWeight: "bold",
    padding: 2,
  },
  gameCommentsJubotron: {
    flex: 1,
  },
});