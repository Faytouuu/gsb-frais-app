import { StyleSheet } from "react-native";

export const fraisFormStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 16,
        backgroundColor: "#FFFFFF",
    },
    formTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#1E2430",
    },
    input: {
        borderWidth: 1,
        borderColor: "#CCCCCC",
        borderRadius: 8,
        padding: 12,
        marginTop: 4,
        marginBottom: 16,
    },
    smallButtonRow: {
        flexDirection: "row",
        gap: 12,
    },
    smallbutton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        backgroundColor: "#333333",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#333333",
        borderRadius: 8,
        padding: 14,
        alignItems: "center",
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },
    error: {
        color: "red",
    },
});