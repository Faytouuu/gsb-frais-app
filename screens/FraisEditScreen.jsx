import { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import FraisForm from "../components/FraisForm";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { getFrais, updateFrais } from "../services/fraisService";

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
});

export default function FraisEditScreen({ navigation, route }) {
    const { id } = route.params;
    const { token } = useAuth();
    const [frais, setFrais] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Récupération du frais à modifier
    useEffect(() => {
        const fetchFrais = async () => {
            try {
                setFrais(await getFrais(id, token));
            } catch (error) {
                console.error("Erreur:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchFrais();
    }, [id, token]);

    // Appelée par FraisForm avec les valeurs saisies : on les fusionne
    // avec les champs non modifiables du frais d'origine.
    async function handleUpdate(values) {
        await updateFrais(
            {
                id_frais: frais.id_frais,
                id_visiteur: frais.id_visiteur,
                id_etat: frais.id_etat,
                montantvalide: frais.montantvalide,
                ...values,
            },
            token
        );
        navigation.navigate("Dashboard");
    }

    let content;
    if (loading) {
        content = <ActivityIndicator size="large" />;
    } else if (!frais) {
        content = <Text>{error || "Frais non trouvé"}</Text>;
    } else {
        content = <FraisForm frais={frais} onSubmit={handleUpdate} />;
    }

    return (
        <View style={{ flex: 1 }}>
            <Navbar />
            <View style={styles.screen}>{content}</View>
        </View>
    );
}
