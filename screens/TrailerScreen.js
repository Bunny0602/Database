import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Video } from 'expo-av';

const TrailerScreen = ({ route }) => {
  const { Trailer } = route.params || {};
  const videoUrl = Trailer?.videoUrl;
  const genre = Trailer?.genre;

  if (!videoUrl) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No trailer available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: videoUrl }}  // Use the direct video URL here
        style={styles.videoPlayer}
        useNativeControls
        resizeMode="contain"
      />
      <Text style={styles.title}>{Trailer.title}</Text>
      <Text style={styles.genre}>{genre}</Text>
      <Text style={styles.description}>{Trailer.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  videoPlayer: {
    width: "100%",
    height: 300,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  description: {
    color: "#aaa",
    fontSize: 16,
    marginTop: 5,
  },
  errorText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});

export default TrailerScreen;
