import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";

import { useState } from "react";

export default function TelaSucessoAnimal ({ navigation }) {
  return (
    <>
      <Text
        style={{
          fontFamily: "Courgette Regular",
          fontSize: "53px",
          color: "#ffd358",
          textAlign: "center",
        }}
      >
        Eba!
      </Text>
      <Text
        style={{
          fontFamily: "Roboto Regular",
          fontSize: "14px",
          color: "#757575",
          textAlign: "center",
        }}
      >
        O cadastro do seu pet foi realizado com sucesso!
      </Text>
      <Text
        style={{
          fontFamily: "Roboto Regular",
          fontSize: "14px",
          color: "#757575",
          textAlign: "center",
        }}
      >
        Certifique-se que permitiu o envio de notificações por push no campo
        privacidade do menu configurações do aplicativo. Assim, poderemos te
        avisar assim que alguém interessado entrar em contato!
      </Text>
      <TouchableOpacity
        style={{
          width: "50%",
          height: 40,
          borderRadius: 8,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffd358",
        }}
        onPress={navigation.navigate("Dashboard")}
      >
        <Text style={{ color: "#434343", fontSize: 16, fontWeight: "bold" }}>
          Voltar para o Dashboard
        </Text>
      </TouchableOpacity>
    </>
  );
};

