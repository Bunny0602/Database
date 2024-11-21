import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import TrailerCard from "../components/TrailerCard";

const GenreScreen = ({ route, navigation }) => {
  const { genre } = route.params;
  const [trailers, setTrailers] = useState([]);

  useEffect(() => {
    const fetchTrailersByGenre = async () => {
      const genreName = genre === "Action" ? "Trailer-Action" : "Trailer-Horror";
      const querySnapshot = await getDocs(collection(db, genreName));
      const genreData = [];
      querySnapshot.forEach((doc) => {
        genreData.push({ id: doc.id, ...doc.data() });
      });
      setTrailers(genreData);
    };

    fetchTrailersByGenre();
  }, [genre]);

  const renderTrailer = ({ item }) => (
    <TrailerCard
      thumbnailUrl={item.thumbnailUrl}
      title={item.title}
      genre={item.genre}
      onPress={() => navigation.navigate("TrailerScreen", { Trailer: item })}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={trailers}
        keyExtractor={(item) => item.id}
        renderItem={renderTrailer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
});

export default GenreScreen;
