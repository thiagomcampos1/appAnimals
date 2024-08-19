import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import config from "../../config";
import EntrarButton from "../../components/CustomButton";
import { sendPushNotification } from "../../services/notifications";
import { useAuth } from "../../config/auth";


const DetalhesAnimal = ({ route }) => {
  const { animalId } = route.params;
  const [animal, setAnimal] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const {user} = useAuth();

  const handleAdotar = ()=>{
    sendPushNotification("Adoção", `${user.nome_perfil} deseja adotar seu pet!`, user.uid, animal.dono, animal.id).then(()=>{
      Alert.alert("Solicitação enviada!")
    }).catch((error)=>{
      Alert.alert("Não foi possivel notificar o dono!")
    })
  }

  useEffect(() => {
    const fetchAnimalDetails = async () => {
      const animalRef = doc(config.db, "animais", animalId);
      const animalDoc = await getDoc(animalRef);

      if (animalDoc.exists()) {
        const animalData = animalDoc.data();
        animalData.id = animalDoc.id;
        setAnimal(animalData);
        const imageRef = ref(config.storage, `animaisPhoto/${animalId}`);
        const imageURL = await getDownloadURL(imageRef);
        setImageUrl(imageURL);
      } else {
        Alert.alert("Animal não encontrado!");
        console.error("Animal não encontrado");
      }
    };

    fetchAnimalDetails();
  }, [animalId]);

  return (
    <>
      <ScrollView>
        {animal && (
          <View
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            {animal && (
              <>
                {imageUrl && (
                  <Image
                    source={{ uri: imageUrl }}
                    style={{
                      width: 160,
                      height: 160,
                      borderRadius: 80, // Faz a imagem circular
                      marginTop: 16,
                    }}
                  />
                )}
                <Text style={{ fontSize: 14, color: "#757575" }}>NOME</Text>
                <Text style={{ fontSize: 20, color: "#434343" }}>
                  {animal.nomePet}
                </Text>
                <Text style={{ fontSize: 14, color: "#757575" }}>TIPO</Text>
                <Text
                  style={{ fontSize: 16, color: "#434343", marginBottom: 12 }}
                >
                  {animal.tipo}
                </Text>

                <Text style={{ fontSize: 14, color: "#757575" }}>RAÇA</Text>
                <Text
                  style={{ fontSize: 16, color: "#434343", marginBottom: 12 }}
                >
                  {animal.raca}
                </Text>

                <Text style={{ fontSize: 14, color: "#757575", marginBottom: 12 }}>
                  SEXO
                </Text>
                <Text style={{ fontSize: 16, color: "#434343" }}>
                  {animal.sexo}
                </Text>

                <Text style={{ fontSize: 14, color: "#757575", marginBottom: 12 }}>PORTE</Text>
                <Text style={{ fontSize: 16, color: "#434343" }}>
                  {animal.porte}
                </Text>

                <Text style={{ fontSize: 14, color: "#757575", marginBottom: 12 }}>IDADE</Text>
                <Text style={{ fontSize: 16, color: "#434343" }}>
                  {animal.idade}
                </Text>

                <Text style={{ fontSize: 14, color: "#757575", marginBottom: 12 }}>PESO</Text>
                <Text style={{ fontSize: 16, color: "#434343" }}>
                  {animal.peso}
                </Text>

                <Text style={{ fontSize: 14, color: "#757575", marginBottom: 12 }}>VACINADO</Text>
                <Text style={{ fontSize: 16, color: "#434343" }}>
                  {animal.vacinado}
                </Text>

                <Text style={{ fontSize: 14, color: "#757575", marginBottom: 12 }}>
                  DESCRIÇÃO
                </Text>
                <Text style={{ fontSize: 16, color: "#434343" }}>
                  {animal.descricao}
                </Text>
                
                <EntrarButton title="Adotar" onPress={handleAdotar}/>
                {/* Adicione outros campos aqui */}
              </>
            )}
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default DetalhesAnimal;
