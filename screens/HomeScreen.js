import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import TrailerCard from "../components/TrailerCard";

const HomeScreen = ({ navigation }) => {
  const [trailers, setTrailers] = useState([]);

  useEffect(() => {
    const fetchTrailers = async () => {
      const querySnapshot = await getDocs(collection(db, "Trailer"));
      const trailerData = [];
      querySnapshot.forEach((doc) => {
        trailerData.push({ id: doc.id, ...doc.data() });
      });
      setTrailers(trailerData);
    };
    fetchTrailers();
  }, []);
  

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
      <Text style={styles.genreTitle}>Genres</Text>
      <View style={styles.genresContainer}>
        {/* Action Genre Button */}
        <TouchableOpacity
          style={styles.genreButton}
          onPress={() => navigation.navigate("ActionScreen")}
        >
          <Text style={styles.genreText}>Action</Text>
        </TouchableOpacity>

        {/* Horror Genre Button */}
        <TouchableOpacity
          style={styles.genreButton}
          onPress={() => navigation.navigate("HorrorScreen")}
        >
          <Text style={styles.genreText}>Horror</Text>
        </TouchableOpacity>
      </View>

      {/* Display All Trailers */}
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
    paddingTop: 20,
  },
  genreTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  genresContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  genreButton: {
    backgroundColor: "#6200ea",
    padding: 10,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
  genreText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomeScreen;
