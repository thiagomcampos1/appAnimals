import React, { useState } from "react";

import { ScrollView, View, Text, TextInput, Pressable } from "react-native";
import {createUserWithEmailAndPassword} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore"
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';

import Container from "../../components/Container";
import config from '../../config/index';
import styles from './styles.js';

const CadastroPessoal = ({ navigation }) => {
  const [nome_completo, setNomeCompleto] = useState("");
  const [idade, setIdade] = useState("");
  const [email, setEmail] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [nome_perfil, setNomePerfil] = useState("");
  const [senha, setSenha] = useState("");
  const [senha_confirm, setSenhaConfirm] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
  
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleCadastro = () => {
    if (senha != senha_confirm) {
      alert("As senhas não coincidem.");
      return;
    }
    createUserWithEmailAndPassword(config.auth, email, senha)
      .then(async (userCredential) => {
        addDoc(collection(config.db, "users"),
          {
            uid: userCredential.user.uid,
            nome_completo: nome_completo,
            idade: idade,
            email: email,
            estado: estado,
            cidade: cidade,
            endereco: endereco,
            telefone: telefone,
            nome_perfil: nome_perfil
          }
        )
        .then(async (docRef) => {
          fetch(image)
            .then(async (response) => { response.blob().then(async (blob) => {
              console.log('imagem:', blob);
              uploadBytesResumable(ref(getStorage(), `profilePhotos/${email}`), blob)
              .then((snapshot) => {
                navigation.navigate('Login');
              })
              .catch((error) => {
                console.log(error);
                alert("Falha ao persistir a imagem!\n"+error);
                return;
              })
            })
            .catch((error) => {
              console.log(error);
              alert("Falha ao carregar a imagem!\n"+error);
              return;
            })
          });
        }).catch((error) => {
          console.log(error);
          alert("Falha ao persistir os dados!\n"+error);
          return;
        })
      })
      .catch((error) => {
        alert("Falha ao cadastrar usuario!\n"+error);
        return;
      })
    ;
  };

  return (
    <Container>
      <ScrollView>
        <View style={styles.container}>
      </View>
      <View style={styles.content}>
        <Text style={styles.msgCard}>As informações preenchidas serão divulgadas apenas para a pessoa com a qual você realizar o processo de adoção e/ou apadrinhamento, após a formalização do processo.</Text>
        <Text style={styles.sectionText}>INFORMAÇÕES PESSOAIS</Text>
        <TextInput
          placeholder="Nome completo"
          style={styles.input}
          value={nome_completo}
          onChangeText={(text) => setNomeCompleto(text)}
        />
        <TextInput
          placeholder="Idade"
          inputMode="numeric"
          style={styles.input}
          value={idade}
          onChangeText={(text) => setIdade(text)}
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)} />
        <TextInput
          placeholder="Estado"
          style={styles.input}
          value={estado}
          onChangeText={(text) => setEstado(text)} />
        <TextInput
          placeholder="Cidade"
          style={styles.input}
          value={cidade}
          onChangeText={(text) => setCidade(text)}
        />
        <TextInput
          placeholder="Endereço"
          style={styles.input}
          value={endereco}
          onChangeText={(text) => setEndereco(text)}
        />
        <TextInput
          placeholder="Telefone"
          inputMode="numeric"
          style={styles.input}
          value={telefone}
          onChangeText={(text) => setTelefone(text)}
        />
        <Text style={styles.sectionText}>INFORMAÇÕES DE PERFIL</Text>
        <TextInput
          placeholder="Nome de usuário"
          style={styles.input}
          value={nome_perfil}
          onChangeText={(text) => setNomePerfil(text)}
        />
        <TextInput
          placeholder="Senha"
          style={styles.input}
          secureTextEntry={true}
          value={senha}
          onChangeText={(text) => setSenha(text)}
        />
        <TextInput
          placeholder="Confirmação de senha"
          style={styles.input}
          secureTextEntry={true}
          value={senha_confirm}
          onChangeText={(text) => setSenhaConfirm(text)}
        />
        <Text style={styles.sectionText}>FOTO DE PERFIL</Text>
        <Pressable style={styles.btnImage} onPress={pickImage}>
          <Text style={styles.btnImageText}>adicionar foto</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>FAZER CADASTRO</Text>
        </Pressable>
      </View>

      </ScrollView>
    </Container>
  );
};

export default CadastroPessoal;
