import { StyleSheet } from "react-native";

export const dashboardStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#E9EDF1",
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D5D8DF",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    backgroundColor: "#F7F7F7",
    fontSize: 16,
    color: "#2A2B30",
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF1F5",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  filterText: {
    flex: 1,
    marginLeft: 10,
    color: "#2F3542",
    fontSize: 14,
  },
});
