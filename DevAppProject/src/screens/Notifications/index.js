import React, {useState} from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { getDocs, collection, where, query, updateDoc, doc, setDoc, deleteDoc } from 'firebase/firestore';

import { useAuth } from '../../config/auth';
import config from '../../config';
import Container from '../../components/Container';
import styles from './style';
import { deleteNotification, sendPushNotification } from '../../services/notifications';

const NotificationsScreen = ({ navigation }) => {
    const [notifications, setNotifications] = useState([]);
    const { user } = useAuth();

    const getNotifications = async () => {
        // query where notifications has reciever = user.docId
        const notificationsQuery = query(collection(config.db, "notifications"), where("reciever", "==", user.uid));
        const notificationsDocs = await getDocs(notificationsQuery);
        setNotifications(notificationsDocs.docs.map(doc => {
            let data = doc.data();
            data.id = doc.id;
            return data;
        }));
    }
    getNotifications();

    const chat = (sender, id) => {
        const chatRef = doc(config.db, 'chats', id);
      
        setDoc(chatRef, {
            users: [user.uid, sender],
            messages: []
        })
            .then(() => {
                console.log('Document written with ID: ', id);
                navigation.navigate('Chat', { chatId: id });
            })
            .catch((error) => {
                console.error('Error writing document: ', error);
            });
    };
      

    const adocao = (animalid, sender, reciever, id) => {
        // sobrescreve o dono do animal
        updateDoc(doc(collection(config.db, "animais"), animalid), {
            dono: sender
        }).then(() => {
            console.log("animal transferido!");
            deleteNotification(id);
        });
        // apaga o chat
        deleteDoc(doc(config.db, "chats", id));
        // avisa o novo dono do animal
        sendPushNotification("Adotado", `${user.nome_perfil} concordou com a adoção, parabéns!`, user.uid, reciever, animalid)
            .then(()=>{
                console.log("Solicitação enviada!")
            }).catch((error)=>{
                console.log(user.uid, reciever, animalid);
                console.log("Não foi possivel notificar o dono!", error)
            })
    }

    const rejeitar = (id) => {
        // apaga a notificação
        deleteNotification(id);
        // apaga o chat
        deleteDoc(doc(config.db, "chats", id));
        console.log("Pedido rejeitado!");
    }

    return (
        <Container styles={styles.content}>
            <View>
                <FlatList
                    data={notifications}
                    renderItem={({ item }) => (
                        <View style={styles.notificationCard}>
                            <Text style={styles.notificationTitle}>{item.title}</Text>
                            <Text style={styles.notificationBody}>{item.body}</Text>
                            <View style={styles.buttonsLine}>{
                                item.title == 'Adotado' ?
                                <TouchableOpacity style={styles.deleteButton} onPress={ ()=>deleteNotification(item.id) }>
                                    <Text>Apagar</Text>
                                </TouchableOpacity>
                                :
                                <>
                                    <TouchableOpacity style={styles.chatButton} onPress={ ()=>rejeitar(item.id) }>
                                        <Text>Rejeitar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.chatButton} onPress={ ()=>adocao(item.animal, item.sender, item.reciever, item.id) } >
                                        <Text>Aceitar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.chatButton} onPress={ ()=>chat(item.sender, item.id) }>
                                        <Text>Chat</Text>
                                    </TouchableOpacity>
                                </>
                                }
                            </View>
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </Container>
    );
};

export default NotificationsScreen;
