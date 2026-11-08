import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TextInput, Switch } from "react-native";
import FraisCard from "../components/FraisCard";
import Navbar from "../components/Navbar";
import {dashboardStyles as styles} from "../styles/dashboardStyles.js";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../services/authService";

export default function DashboardScreen() {
  const { user, token } = useAuth();
  const [fraisList, setFraisList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterNonNull, setFilterNonNull] = useState(true);

  const filteredFrais = fraisList
    .filter((frais) => !filterNonNull || frais.montantvalide !== null)
    .filter((frais) =>
      frais.id_visiteur.toString().includes(searchTerm) ||
      frais.anneemois.includes(searchTerm)
    );
  
  useEffect(() => {
    const fetchFrais = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}frais/liste/${user.id_visiteur}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }
        const data = await response.json();
        setFraisList(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des frais :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFrais();
  }, [user, token]);
  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  return (
    <>
      <Navbar />
      <View style={styles.screen}>
        <TextInput
          placeholder="Rechercher par année-mois ou ID visiteur..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          style={styles.input}
        />

        <View style={styles.filterRow}>
          <Switch
            value={filterNonNull}
            onValueChange={setFilterNonNull}
            trackColor={{ false: "#d1d5db", true: "#3b82f6" }}
            thumbColor={"#ffffff"}
          />
          <Text style={styles.filterText}>Afficher seulement les frais avec un montant validé</Text>
        </View>

        <FlatList
          data={filteredFrais}
          keyExtractor={(item) => item.id_frais.toString()}
          renderItem={({ item }) => <FraisCard frais={item} />}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </>
  );
}