import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    content: {
        padding: 16,
    },
    msgCard: {
        backgroundColor: '#cfe9e5',
        color: '#434343',
        fontSize: 14,
        borderRadius: 4,
        width: 328,
        marginBottom: 28,
        padding: 10,
    },
    sectionText: {
        marginBottom: 32,
        color: '#88C9BF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        width: 328,
        height: 40,
        borderBottomWidth: 1,
        marginBottom: 20,
        padding: 10,
        color: '#bdbdbd',
        fontSize: 14
    },
    button: {
        width: '100%',
        height: 40,
        backgroundColor: '#88C9BF',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#434343',
        fontSize: 12,
    },
    btnImage: {
        width: 128,
        height: 128,
        backgroundColor: '#e6e7e7',
        borderRadius: 4,
        marginBottom: 32,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    btnImageText: {
        color: '#757575',
        fontSize: 14,
        textAlign: 'center',
    },
});

export default styles;
