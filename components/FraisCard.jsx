import { StyleSheet, Text, View } from "react-native";

export default function FraisCard({ frais }) {
  const montantValide =
    frais.montantvalide !== null && frais.montantvalide !== undefined
      ? `${Number(frais.montantvalide).toFixed(2).replace(".", ",")} €`
      : "- €";

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        Note [{frais.id_frais}] Visiteur n°{frais.id_visiteur} - {frais.anneemois}
      </Text>
      <Text style={styles.meta}>Nombre de justificatifs : {frais.nbjustificatifs}</Text>
      <Text style={styles.meta}>Montant validé : {montantValide}</Text>
      <Text style={styles.meta}>Montant saisi : - €</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1E2430",
    marginBottom: 8,
  },
  meta: {
    fontSize: 15,
    color: "#2F3542",
    marginTop: 4,
    lineHeight: 22,
  },
});
