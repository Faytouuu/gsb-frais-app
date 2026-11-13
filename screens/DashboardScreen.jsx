import { useState, useCallback } from "react";
import { Alert, View, Text, StyleSheet, FlatList, ActivityIndicator, TextInput, Switch } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import FraisCard from "../components/FraisCard";
import Navbar from "../components/Navbar";
import {dashboardStyles as styles} from "../styles/dashboardStyles.js";
import { useAuth } from "../context/AuthContext";
import { getFraisList, deleteFrais } from "../services/fraisService";

export default function DashboardScreen() {
  const navigation = useNavigation();
  const { user, token } = useAuth();
  const [fraisList, setFraisList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterNonNull, setFilterNonNull] = useState(true);

  function handleEdit(id) {
    navigation.navigate("FraisEdit", { id });
  }

  const removeFrais = async (id) => {
    try {
      await deleteFrais(id, token);
      setFraisList((prev) => prev.filter((f) => f.id_frais !== id));
    } catch (error) {
      Alert.alert("Erreur lors de la suppression :", error.message);
    }
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Confirmation",
      "Êtes-vous sûr de vouloir supprimer cette note de frais ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => removeFrais(id),
        },
      ]
    );
  };

  const filteredFrais = fraisList
    .filter((frais) => !filterNonNull || frais.montantvalide !== null)
    .filter((frais) =>
      frais.id_visiteur.toString().includes(searchTerm) ||
      frais.anneemois.includes(searchTerm)
    );
  
  useFocusEffect(
    useCallback(() => {
      const fetchFrais = async () => {
        if (!user || !token) {
          setFraisList([]);
          setError("");
          setLoading(false);
          return;
        }

        try {
          setLoading(true);
          setFraisList(await getFraisList(user.id_visiteur, token));
          setError("");
        } catch (error) {
          console.error("Erreur lors de la récupération des frais :", error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchFrais();
    }, [user, token])
  );
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

        {error ? <Text style={styles.error}>{error}</Text> : null}
        <FlatList
          data={filteredFrais}
          keyExtractor={(item) => item.id_frais.toString()}
          renderItem={({ item }) => (
            <FraisCard frais={item} onEdit={handleEdit} onDelete={handleDelete} />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </>
  );
}