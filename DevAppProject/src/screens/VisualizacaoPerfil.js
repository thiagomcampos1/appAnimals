import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  View,
  Image,
} from "react-native";
import { Feather, FontAwesome } from "react-native-vector-icons";
import EditarPerfil from "./EditarPerfil";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import { useAuth } from "../config/auth";

export default function VisualizacaoPerfil() {
  const { user, photoURL } = useAuth();

  const navigation = useNavigation();
  return (
    <>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <View>
              <Image source={{ uri: photoURL }} style={styles.profilePhoto} />
            </View>
            <Text style={styles.texto2}>{user.nome_perfil}</Text>
            <View style={styles.campo}>
              <Text style={styles.title}>{"NOME COMPLETO"}</Text>
              <Text style={styles.textContent}>{user.nome_completo}</Text>
            </View>
            <View style={styles.campo}>
              <Text style={styles.title}>{"IDADE"}</Text>
              <Text style={styles.textContent}>{user.idade}</Text>
            </View>
            <View>
              <View style={styles.campo}>
                <Text style={styles.title}>{"EMAIL"}</Text>
                <Text style={styles.textContent}>{user.email}</Text>
              </View>
              <View style={styles.campo}>
                <Text style={styles.title}>{"LOCALIZAÇÃO"}</Text>
                <Text style={styles.textContent}>{user.estado}</Text>
              </View>
              <View style={styles.campo}>
                <Text style={styles.title}>{"ENDEREÇO"}</Text>
                <Text style={styles.textContent}>{user.endereco}</Text>
              </View>
              <View style={styles.campo}>
                <Text style={styles.title}>{"TELEFONE"}</Text>
                <Text style={styles.textContent}>{user.telefone}</Text>
              </View>
              <View style={styles.campo}>
                <Text style={styles.title}>{"NOME DE USUÁRIO"}</Text>
                <Text style={styles.textContent}>{user.nome_perfil}</Text>
              </View>
              <View style={styles.campo}>
                <Text style={styles.title}>{"HISTÓRICO"}</Text>
                <Text style={styles.textContent}>{"Adotou 1 gato"}</Text>
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={styles.btnContainer}
                onPress={() => navigation.navigate("EditarPerfil")}
              >
                <Text style={styles.btnText}>{"EDITAR PERFIL"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  texto2: {
    color: "#434343",
    fontSize: 20,
    marginBottom: 36,
  },
  texto1: {
    color: "#434343",
    fontSize: 16,
  },
  topBar: {
    backgroundColor: "#88C9BF",
    minHeight: 24,
  },
  menuBar: {
    backgroundColor: "#CFE9E5",
    minHeight: 56,
    paddingTop: 16,
    paddingLeft: 16,
  },
  menuBarText: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 30,
  },
  content: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  textContent: {
    color: "#757575",
    fontSize: 14,
  },
  title: {
    color: "#589b9b",
    fontSize: 12,
    fontWeight: "500",
  },
  campo: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: "#88C9BF",
    minWidth: 232,
    minHeight: 40,
  },
  btnText: {
    color: "#434343",
    textAlign: "center",
    paddingTop: 13,
    fontSize: 12,
  },
  profilePhoto: {
    marginTop: 16,
    marginBottom: 16,
    width: 250,
    height: 250,
    borderRadius: 125,
  },
});
