import { useState, useCallback } from "react";
import { Alert, View, Text, StyleSheet, FlatList, ActivityIndicator, TextInput, Switch } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FraisCard from "../components/FraisCard";
import Navbar from "../components/Navbar";
import {dashboardStyles as styles} from "../styles/dashboardStyles.js";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config";

export default function DashboardScreen() {
  const navigation = useNavigation();
  const { user, token } = useAuth();
  const [fraisList, setFraisList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterNonNull, setFilterNonNull] = useState(true);

  function handleEdit(id) {
    navigation.navigate("FraisEdit", { id });
  }

  const handleDelete = (id) => {
    Alert.alert(
      "Confirmation",
      "Êtes-vous sûr de vouloir supprimer cette note de frais ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem("token");
              if (!token) throw new Error("Token manquant");
              const response = await fetch(`${API_URL}frais/suppr`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ id_frais: id }),
              });
              if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.error || `Erreur HTTP ${response.status}`);
              }
              setFraisList((listeActuelle) =>
                listeActuelle.filter((frais) => frais.id_frais !== id)
              );
            } catch (error) {
              console.error("Erreur lors de la suppression :", error);
              Alert.alert("Erreur", error.message || "La suppression a échoué.");
            }
          },
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
          setLoading(false);
          return;
        }

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