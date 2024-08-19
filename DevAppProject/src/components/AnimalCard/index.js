import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const AnimalCard = ({ animal }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>{animal.nomePet}</Text>
        </View>
        <Image
          source={{ uri: animal.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.info}>
          <Text style={styles.text}>Porte: {animal.porte}</Text>
          <Text style={styles.text}>Sexo: {animal.sexo}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 8, // Espaçamento do topo
    marginBottom: 8, // Espaçamento da parte de baixo
  },
  card: {
    width: 344,
    height: 264,
    borderWidth: 1,
    borderColor: "#88c9bf", // Cor azul
    borderRadius: 8,
    marginBottom: 8, // Espaçamento entre os cards
  },
  header: {
    backgroundColor: "#88c9bf", // Cor azul
    padding: 8,
  },
  title: {
    fontSize: 16,
    color: "#434343",
  },
  image: {
    width: 344,
    height: 183, // Foto do Animal: 344dp x 183dp
  },
  info: {
    padding: 8,
    textAlign: "center",
  },
  text: {
    fontSize: 12,
    color: "#434343",
  },
});

export default AnimalCard;
