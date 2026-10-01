import { View, Text, StyleSheet } from "react-native";
import Navbar from "../components/Navbar";

export default function HomeScreen() {
  return (
    <View style={styles.screen}>
      <Navbar />
      <View style={styles.content}>
        <Text>Bienvenue</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 16 },
});
