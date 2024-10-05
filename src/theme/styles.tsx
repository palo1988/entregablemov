import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    gap: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  message: {
    backgroundColor: "#7a0808",
    width: "auto",
  },
  textRedirect: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: "#705aa9",
  },
  rootActivity: { flex: 1, justifyContent: "center", alignItems: "center" },
  rootHome: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 50,
    fontSize: 20,
  },
  header: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    fontSize: 60,
  },
  icon: {
    alignItems: "flex-end",
    flex: 1,
  },
  Modal: {
    padding: 20,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  rootListProduct: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    gap: 20,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 15,
  },
  rootInputsProduct: {
    flexDirection: "row",
    gap: 35,
  },
  rootDetail: {
    flex: 1,
    padding: 20,
    marginTop: 20,
    backgroundColor: "#2E8BAFFF",
  },
});
