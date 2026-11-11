import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, Text } from "react-native";
import { API_URL } from "../config";
import FraisForm from "../components/FraisForm";

export default function FraisEditScreen() {
    const route = useRoute();
    const { id } = route.params;
    const [frais, setFrais] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFrais = async () => {
            try {
                const token = await AsyncStorage.getItem("token");
                const response = await fetch(`${API_URL}frais/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json().catch(() => ({}));
                if (!response.ok) {
                    throw new Error(data.error || `Erreur HTTP ${response.status}`);
                }
                setFrais(data);
            } catch (error) {
                console.error("Erreur:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFrais();
    }, [id]);

    if (loading) return <ActivityIndicator size="large" />;
    if (!frais) return <Text>Frais non trouvé</Text>;

    return <FraisForm frais={frais} />;
}
