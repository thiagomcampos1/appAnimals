import React, {useState} from 'react';
import { collection, query, addDoc, orderBy, getDocs } from 'firebase/firestore';
import { GiftedChat } from 'react-native-gifted-chat';


import { useAuth } from '../../config/auth';
import config from '../../config';
import Container from '../../components/Container';


const ChatScreen = ({ route }) => {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const { chatId } = route.params;

    const handleSend = async(newMessages = []) => {
        console.log("newMessages:", newMessages);
        //setMessages(GiftedChat.append(messages, newMessages));
        addDoc(collection(config.db, 'chats', chatId, 'messages'), newMessages[0]).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        }).catch((error) => {
            console.error("Error adding document: ", error);
        });
    }

    const chatCollection = collection(config.db, 'chats', chatId, 'messages');
    const q = query(chatCollection, orderBy('createdAt', 'desc'));

    const getChat = async () => {
        try {
            const snapshot = await getDocs(q);
            
            const chatMessages = snapshot.docs.map((doc) => ({
                ...doc.data(),
                createdAt: doc.data().createdAt.toDate(),
            }));
            
            setMessages(chatMessages);
        } catch (error) {
            console.error('Erro ao obter mensagens do chat:', error);
        }
    };
    getChat();

    return (
        <Container>
            <GiftedChat
                messages={messages}
                onSend={newMessages => handleSend(newMessages)}
                user={{ _id: user.uid }}
            />
        </Container>
    );
};

export default ChatScreen;
