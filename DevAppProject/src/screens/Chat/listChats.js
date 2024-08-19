import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView, FlatList, Touchable, TouchableOpacity } from 'react-native';
import { getDocs, collection, where, query, getDoc } from 'firebase/firestore';

import { useAuth } from '../../config/auth';
import config from '../../config';
import Container from '../../components/Container';
import styles from './style';


const ListChats = ({ navigation }) => {
    const { user } = useAuth();
    const [chats, setChats] = useState([]);

    const getChats = async () => {
        try {
            const chatsQuery = query(collection(config.db, 'chats'), where('users', 'array-contains', user.uid));
            const chatsDocs = await getDocs(chatsQuery);
        
            const docs = await Promise.all(
                chatsDocs.docs.map(async (doc) => {
                const data = doc.data();
                data.id = doc.id;
        
                if (Array.isArray(data.users) && data.users.length > 0) {
                    const promessasDeNomes = data.users.map(async (uid, index) => {
                        data[`username${index}`] = await getUserName(uid);
                    });
                    await Promise.all(promessasDeNomes);
                }
                return data;
                })
            );
            setChats(docs);
        } catch (error) {
            console.error('Erro ao obter chats:', error);
        }
    };
      
    getChats();

    const chat = (chatId) => {
        navigation.navigate('Chat', {chatId: chatId});
    }

    const getUserName = async (userUID) => {
        const q = query(collection(config.db, "users"), where("uid", "==", userUID));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.docs.length == 0) {
            console.log("Usuário não encontrado");
        }
        const user = querySnapshot.docs[0].data();
        return user.nome_perfil;
    }

    return (
        <Container>
                <View style={styles.content}>
                    <FlatList
                        data={chats}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={ ()=>chat(item.id) } style={styles.chatCard}>
                                <Text>{ item.users[1] != user.uid ? item.username1 : item.username0 }</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>
        </Container>
    );
};

export default ListChats;
