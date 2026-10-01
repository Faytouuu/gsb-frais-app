import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TextInput } from "react-native";
import fraisData from "../data/frais.json";
import FraisCard from "../components/FraisCard";
import Navbar from "../components/Navbar";
import {dashboardStyles as styles} from "../styles/dashboardStyles.js";

export default function DashboardScreen() {
  const [fraisList, setFraisList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFrais = fraisList.filter((frais) =>
    frais.id_visiteur.toString().includes(searchTerm) ||
    frais.anneemois.includes(searchTerm)
  
  );
  
  useEffect(() => {
    // Simulation d'un appel API avec un délai de 500 ms
    setTimeout(() => {
      setFraisList(fraisData);
      setLoading(false);
    }, 500);
  }, []);
  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  return (
    <>
      <Navbar />
      <TextInput
        placeholder="Rechercher par année-mois ou ID visiteur..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={styles.input}
      />
      <FlatList
        data={filteredFrais}
        keyExtractor={(item) => item.id_frais.toString()}
        renderItem={({ item }) => <FraisCard frais={item} />}
      />
    </>
  );
}