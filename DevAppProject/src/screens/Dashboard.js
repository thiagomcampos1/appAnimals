import React from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import EntrarButton from "../components/CustomButton";

import config from "../config/index";
import { collection, getDoc, doc } from "firebase/firestore";
import { useAuth } from "../config/auth";

const Dashboard = ({ navigation }) => {

  const { logout } = useAuth();

  const navigateToCadastroAnimal = () => {
    navigation.navigate("CadastroAnimal");
  };

  const navigateToVisualizacaoPerfil = () => {
    navigation.navigate("VisualizacaoPerfil");
  };

  const navigateToCadastroForm = () => {
    navigation.navigate("CadastroPessoal");
  };

  const navigateToEditarPerfil = () => {
    navigation.navigate("EditarPerfil");
  };

  // const navigateToEditarAnimal = () => {
  //   // id do animal constante // TODO: mudar para pegar o id do animal selecionado
  //   const animalUID = "FqmCQ5gQeBoq1xTqaxaj";
  //   getDoc(doc(collection(config.db, "animais"), animalUID)).then(
  //     (animalDoc) => {
  //       console.log("animal:", animalDoc.data());
  //       navigation.navigate("EditarAnimal", { animalDoc: animalDoc });
  //     }
  //   );
  // };

  const navigateToVisualizacaoAnimais = () => {
    navigation.navigate("VisualizacaoAnimais");
  };

  const navigateToMeusAnimais = () => {
    navigation.navigate("MeusAnimais");
  };

  const exit = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Cadastro'}],
    });
    logout();
  };

  const notifications = () => {
    navigation.navigate("Notifications");
  }

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.heading}>Dashboard</Text>
          <EntrarButton
            title="Cadastrar Animal"
            onPress={navigateToCadastroAnimal}
            style={styles.button}
          />
          <EntrarButton
            title="Visualizar Perfil"
            onPress={navigateToVisualizacaoPerfil}
            style={styles.button}
          />
          <EntrarButton
            title="Cadastrar um Usuário"
            onPress={navigateToCadastroForm}
            style={styles.button}
          />
          <EntrarButton
            title="Editar Perfil"
            onPress={navigateToEditarPerfil}
            style={styles.button}
          />
          <EntrarButton
            title="Visualizar Animais"
            onPress={navigateToVisualizacaoAnimais}
            style={styles.button}
          />
          <EntrarButton
            title="Meus Animais"
            onPress={navigateToMeusAnimais}
            style={styles.button}
          />
          <EntrarButton
            title="Notificações"
            onPress={notifications}
            style={styles.button}
          />
          <EntrarButton
            title="Logout"
            onPress={exit}
            style={styles.button}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    paddingTop: "30px",
    marginTop: "30px",
    paddingBottom: "30px",
    marginBottom: "30px", 
  },
});

export default Dashboard;
