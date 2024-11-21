import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import TrailerCard from "../components/TrailerCard";

const HorrorScreen = ({ navigation }) => {
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHorrorTrailers = async () => {
      try {
        const q = query(
          collection(db, "Trailer"),
          where("genreId", "==", "Horror")
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log("No horror trailers found");
        }

        const horrorTrailers = [];
        querySnapshot.forEach((doc) => {
          horrorTrailers.push({ id: doc.id, ...doc.data() });
        });

        setTrailers(horrorTrailers);
      } catch (err) {
        console.error("Error fetching horror trailers:", err);
        setError("Failed to load trailers.");
      } finally {
        setLoading(false);
      }
    };
    fetchHorrorTrailers();
  }, []);

  const renderTrailer = ({ item }) => (
    <TrailerCard
      thumbnailUrl={item.thumbnailUrl}
      title={item.title}
      genre={item.genre}
      onPress={() => navigation.navigate("TrailerScreen", { Trailer: item })}
    />
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Horror Movies</Text>
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
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
});

export default HorrorScreen;
