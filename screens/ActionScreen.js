import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import TrailerCard from "../components/TrailerCard";

const ActionScreen = ({ navigation }) => {
  const [Trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle error state

  useEffect(() => {
    const fetchActionTrailers = async () => {
      try {
        const q = query(
          collection(db, "Trailer"),
          where("genreId", "==", "Action")
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log("No action trailers found");
        } else {
          console.log(`Found ${querySnapshot.size} action trailers.`);
        }

        const actionTrailers = [];
        querySnapshot.forEach((doc) => {
          actionTrailers.push({ id: doc.id, ...doc.data() });
        });

        setTrailers(actionTrailers);
      } catch (err) {
        console.error("Error fetching action trailers:", err);
        setError("Failed to load trailers.");
      } finally {
        setLoading(false); // Data has been loaded
      }
    };

    fetchActionTrailers();
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
      <Text style={styles.title}>Action Movies</Text>
      <FlatList
        data={Trailers}
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

export default ActionScreen;
