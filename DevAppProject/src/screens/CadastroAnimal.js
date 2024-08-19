import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  TextInput,
  Pressable,
  ScrollView
} from "react-native";

import { useState } from "react";
import config from "../config/index";
import { addDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { getAuth } from "firebase/auth";
import { Alert } from "react-native";

const CadastroPetForm = ({ navigation }) => {
  const [nomePet, setNomePet] = useState("");
  const [tipo, setTipo] = useState("");
  const [porte, setPorte] = useState("");
  const [idade, setIdade] = useState("");
  const [raca, setRaca] = useState("");
  const [peso, setPeso] = useState("");
  const [descricao, setDescricao] = useState("");
  const [sexo, setSexo] = useState("");
  const [adocao, setAdocao] = useState("");
  const [vacinado, setVacinado] = useState("");
  const [imagemPerfilAnimal, setImagemPerfilAnimal] = useState(null);

  const auth = getAuth();

  const selecionarImagemPerfilAnimal = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImagemPerfilAnimal(result.assets[0].uri);
    }
  };

  const handleCadastro = async () => {
    const user = auth.currentUser;
    console.log(user);

    const animalData = {
      nomePet: nomePet,
      tipo: tipo,
      idade: idade,
      raca: raca,
      adocao: adocao,
      vacinado: vacinado,
      peso: peso,
      descricao: descricao,
      sexo: sexo,
      porte: porte,
      dono: user.uid,
    };
    try {
      const docRef = await addDoc(
        collection(config.db, "animais"),
        animalData
      );
      if (imagemPerfilAnimal) {
        const response = await fetch(imagemPerfilAnimal);
        const blob = await response.blob();
        await uploadBytesResumable(
          ref(getStorage(), `animaisPhoto/${docRef.id}`),
          blob
        );
      }
      Alert.alert("Animal criado com sucesso!");
      navigation.navigate("VisualizacaoPerfil");
    } catch (e) {
      console.error("Erro ao cadastrar animal:", e);
      Alert.alert("Falha ao cadastrar o animal!");
      navigation.navigate("VisualizacaoPerfil");
    }
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Pressable
            style={styles.btnImage}
            onPress={selecionarImagemPerfilAnimal}
          >
            <Text style={styles.btnImageText}>
              Adicionar foto de perfil de Animal
            </Text>
          </Pressable>

          <TextInput
            placeholder="Nome do Pet"
            style={styles.input}
            value={nomePet}
            onChangeText={(text) => setNomePet(text)}
          />

          <View style={styles.buttonContainer}>
            <Text>Tipo</Text>
            <Button
              title="Gato"
              onPress={() => setTipo("Gato")}
              color={tipo === "Gato" ? "#ffd358" : "gray"}
            />
            <Button
              title="Cachorro"
              onPress={() => setTipo("Cachorro")}
              color={tipo === "Cachorro" ? "#ffd358" : "gray"}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Text>Porte</Text>
            <Button
              title="Pequeno"
              onPress={() => setPorte("Pequeno")}
              color={porte === "Pequeno" ? "#ffd358" : "gray"}
            />
            <Button
              title="Médio"
              onPress={() => setPorte("Médio")}
              color={porte === "Médio" ? "#ffd358" : "gray"}
            />
            <Button
              title="Grande"
              onPress={() => setPorte("Grande")}
              color={porte === "Grande" ? "#ffd358" : "gray"}
            />
          </View>

          <TextInput
            placeholder="Idade do Pet"
            style={styles.input}
            value={idade}
            onChangeText={(text) => setIdade(text)}
          />
          <TextInput
            placeholder="Raça do Pet"
            style={styles.input}
            value={raca}
            onChangeText={(text) => setRaca(text)}
          />
          <TextInput
            placeholder="Peso do Pet"
            style={styles.input}
            value={peso}
            onChangeText={(text) => setPeso(text)}
          />

          <View style={styles.buttonContainer}>
            <Text>Adoção</Text>
            <Button
              title="Sim"
              onPress={() => setAdocao("Sim")}
              color={adocao === "Sim" ? "#ffd358" : "gray"}
            />
            <Button
              title="Não"
              onPress={() => setAdocao("Não")}
              color={adocao === "Não" ? "#ffd358" : "gray"}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Text>Sexo</Text>
            <Button
              title="Macho"
              onPress={() => setSexo("Macho")}
              color={sexo === "Macho" ? "#ffd358" : "gray"}
            />
            <Button
              title="Fêmea"
              onPress={() => setSexo("Fêmea")}
              color={sexo === "Fêmea" ? "#ffd358" : "gray"}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Text>Vacinado</Text>
            <Button
              title="Sim"
              onPress={() => setVacinado("Sim")}
              color={vacinado === "Sim" ? "#ffd358" : "gray"}
            />
            <Button
              title="Não"
              onPress={() => setVacinado("Não")}
              color={vacinado === "Não" ? "#ffd358" : "gray"}
            />
          </View>

          <TextInput
            placeholder="Descrição"
            style={styles.input}
            value={descricao}
            onChangeText={(text) => setDescricao(text)}
          />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#ffd358" }]}
            onPress={handleCadastro}
          >
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  button: {
    width: "50%",
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#434343",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 12,
  },
  btnImage: {
    width: 128,
    height: 128,
    backgroundColor: "#e6e7e7",
    borderRadius: 4,
    marginBottom: 32,
    alignSelf: "center",
    justifyContent: "center",
  },
  btnImageText: {
    color: "#757575",
    fontSize: 14,
    textAlign: "center",
  },
});

export default CadastroPetForm;
