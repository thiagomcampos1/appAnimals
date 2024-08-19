import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { collection, getDocs, where, query } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import config from "../../config";
import { getAuth, useAuth } from "firebase/auth";
import AnimalCard from "../../components/AnimalCard";

const VisualizacaoAnimaisUsuario = ({ navigation }) => {
  const [animais, setAnimais] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchMeusAnimais = async () => {
      if (!user) {
        return;
      }

      const animaisCollection = collection(config.db, "animais");
      const animaisQuery = query(
        animaisCollection,
        where("dono", "==", user.uid)
      );

      const animaisSnapshot = await getDocs(animaisQuery);

      const animaisData = [];
      for (const doc of animaisSnapshot.docs) {
        const data = doc.data();
        const imageUrl = await getAnimalImageUrl(doc.id);
        animaisData.push({ id: doc.id, ...data, imageUrl });
      }

      setAnimais(animaisData);
    };

    fetchMeusAnimais();
  }, [user]);

  const getAnimalImageUrl = async (animalId) => {
    const imageRef = ref(config.storage, `animaisPhoto/${animalId}`);
    try {
      return await getDownloadURL(imageRef);
    } catch (error) {
      console.error("Erro ao obter a URL da imagem:", error);
      return null;
    }
  };

  return (
    <View>
      <FlatList
        data={animais}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("DetalhesAnimal", { animalId: item.id });
            }}
          >
            <AnimalCard animal={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default VisualizacaoAnimaisUsuario;
