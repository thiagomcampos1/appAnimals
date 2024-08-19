import React, { createContext, useState, useContext, useRef } from 'react';
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { where, collection, query, getDocs, updateDoc, doc } from "firebase/firestore";
import { getDownloadURL, ref, getStorage} from "firebase/storage";

import config from '../config/index';

import * as Notifications from 'expo-notifications';
import { handleNotification, registerForPushNotificationsAsync, saveNotification } from "../services/notifications";

Notifications.setNotificationHandler({handleNotification: handleNotification,});

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const {auth} = config;
    const [user, setUser] = useState(null);
    const [photoURL, setPhotoURL] = useState(null);

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();


    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

    const login = async(email, password) => {
        
        try {
            const authentication = await signInWithEmailAndPassword(email, password);
            if (authentication) {
                const q = query(collection(config.db, 'users'), where('uid', '==', authentication.user.uid));
                const querySnapshot = await getDocs(q);

                if(querySnapshot.size > 0) {

                    // set user data
                    const user_data = querySnapshot.docs[0].data();
                    user_data['docId'] = querySnapshot.docs[0].ref.id;
                    user_data['userCredential'] = authentication;
                    console.log('usuario carregado com sucesso');
                    setUser(user_data);

                    // set photo url
                    const url = await getDownloadURL(ref(getStorage(), `profilePhotos/${user_data.email}`));
                    console.log('user photo url:', url);
                    setPhotoURL(url);
                    
                    // active notifications
                    setUpNotifications(user_data);

                    return true;
                }else {
                    console.log('Usuário não encontrado!');
                }
            }
            else {
                console.error('Usuário / Senha incorretos!');
            }
        } catch (error) {
            console.error('Erro ao fazer o login', error);
        }
    };

    const logout = () => {
        // remove user
        // dados vazios para não quebrar a tela pre carregada ao fazer o logout (essas telas esperam um objeto e não null)
        setUser({
            "cidade":"",
            "email":"",
            "endereco":"",
            "estado":"",
            "idade":"",
            "nome_completo":"",
            "nome_perfil":"",
            "telefone":"",
            "token":"",
            "uid":"",
        });
        // remove notification
        Notifications.setNotificationHandler(null);
        // remove token
        setExpoPushToken('');
        // remove token from document user
        updateDoc(doc(collection(config.db, "users"), user.docId), {token: ''});
    };

    const setUpNotifications = async(user)=>{
        registerForPushNotificationsAsync().then(token => {
            // atualiza token no banco
            updateDoc(doc(collection(config.db, "users"), user.docId), {token: token});
            
            setExpoPushToken(token);
        });

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            console.log("Notification Listner: ", notification);
            // salva a notificação no banco
            saveNotification(notification);
            setNotification(notification);
        });
    
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => 
            console.log("Response Listner: ", response)
        );
    
        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }

    return (
        <AuthContext.Provider value={{ user, photoURL, login, logout, expoPushToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};

export default AuthContext;
