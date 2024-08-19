import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    content: {
        padding: 16,
    },
    notificationTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    notificationBody : {
        fontSize: 16,
    },
    chatButton: {
        backgroundColor: "#88c9bf",
        padding: 8,
        borderRadius: 8,
        width: "30%",
        alignItems: "center",
    },
    deleteButton: {
        backgroundColor: "#88c9bf",
        padding: 8,
        borderRadius: 8,
        width: "100%",
        alignItems: "center",
    },
    notificationCard: {
        backgroundColor: "#cfe9e5",
        padding: 16,
        borderRadius: 8,
        marginTop: 16,
    },
    buttonsLine: {
        marginTop: 16,
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

export default styles;
