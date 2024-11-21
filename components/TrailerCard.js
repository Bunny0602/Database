import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const TrailerCard = ({ thumbnailUrl, title, onPress, Genre }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: thumbnailUrl }} style={styles.image} />
      <Text style={styles.genre}>{Genre}</Text>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 200,
  },

  genre: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333", // Color for the genre, can be customized
    marginBottom: 5, // Space between genre and title
  },

  title: {
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default TrailerCard;
