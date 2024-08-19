import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";

import 'firebase/auth';

import { useAuth } from '../../config/auth.js'

import VisualizacaoAnimaisUsuario from '../../screens/VisualizacaoAnimaisUsuario';
import VisualizacaoAnimais from '../../screens/VisualizacaoAnimais';
import DetalhesAnimal from '../../screens/DetalhesAnimal';
import TelaSucessoAnimal from '../../screens/TelaSucessoAnimal';
import LoginScreen from '../../screens/Login';
import VisualizacaoPerfil from '../../screens/VisualizacaoPerfil';
import CadastroPessoal from '../../screens/CadastroPessoal';
import Cadastro from '../../screens/Cadastro';
import Dashboard from '../../screens/Dashboard';
import CadastroPetForm from '../../screens/CadastroAnimal';
import EditarPerfil from '../../screens/EditarPerfil';
import NotificationsScreen from '../../screens/Notifications'
import ChatScreen from '../../screens/Chat';
import ListChats from '../../screens/Chat/listChats';
import { screenOptions, styles } from "./styles.js"

const Drawer = createDrawerNavigator();

const CustomDrawerContentLogout = ({ navigation }) => {
  return (
    <DrawerContentScrollView>
      <View style ={styles.drawerHeader}>
        <Image source={require('../../../assets/Meau_Icone.png')} style={styles.drawerImage} />
        <Text style={styles.text}>Meau</Text>
      </View>
      <DrawerItem 
      label= {() => (<Text style ={styles.customLabel}>Login</Text>)} 
      onPress={() => navigation.navigate('Login')}
      style ={styles.drawerItem}
      />
      <DrawerItem 
      label={() => (<Text style ={styles.customLabel}>Cadastro</Text>)} 
      onPress={() => navigation.navigate('CadastroForm')}
      style ={styles.drawerItem}
      />
    </DrawerContentScrollView>
  )
}

const CustomDrawerContentLogin = (props) => {

  const handleLogout = async () => {
    props.logout();
    props.navigation.navigate('Login');
  }

  return (
    <DrawerContentScrollView>
      <View style ={styles.drawerHeader}>
        <Image source={require('../../../assets/Meau_Icone.png')} style={styles.drawerImage} />
        <Text style={styles.text}>{ props.user.nome_perfil }</Text>
      </View>
      <DrawerItem 
        label={() => (<Text style ={styles.customLabel}>Visualização do Perfil</Text>)} 
        onPress={() => props.navigation.navigate('VisualizacaoPerfil')}
        style ={styles.drawerItem} />
      <DrawerItem 
        label= {() => (<Text style ={styles.customLabel}>Cadastro do Animal</Text>)} 
        onPress={() => props.navigation.navigate('CadastroAnimal')}
        style ={styles.drawerItem} />
      <DrawerItem 
        label={() => (<Text style ={styles.customLabel}>Editar Perfil</Text>)} 
        onPress={() => props.navigation.navigate('EditarPerfil')}
        style ={styles.drawerItem} />
      <DrawerItem 
        label={() => (<Text style ={styles.customLabel}>Meus Animais</Text>)} 
        onPress={() => props.navigation.navigate('MeusAnimais')}
        style ={styles.drawerItem} />
      <DrawerItem 
        label={() => (<Text style ={styles.customLabel}>Ver Animais</Text>)} 
        onPress={() => props.navigation.navigate('VisualizacaoAnimais')}
        style ={styles.drawerItem} />
      <DrawerItem
        label={() => (<Text style ={styles.customLabel}>Notificações</Text>)}
        onPress={() => props.navigation.navigate('Notificações')}
        style ={styles.drawerItem} />
      <DrawerItem
        label={() => (<Text style ={styles.customLabel}>Chats</Text>)}
        onPress={() => props.navigation.navigate('ListChats')}
        style ={styles.drawerItem} />
      <DrawerItem 
        label={() => (<Text style ={styles.customLabel}>Logout</Text>)} 
        onPress={handleLogout}
        style ={styles.drawerItemLogout} />
    </DrawerContentScrollView>

  )
}

export default function MyDrawer() {
  const { user, logout } = useAuth();

  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator screenOptions={screenOptions} drawerContent={(props) => ( user && user.nome_perfil!="" ? <CustomDrawerContentLogin {...props} user={user} logout={logout} /> : <CustomDrawerContentLogout {...props} />)}>
        <Drawer.Screen name="Cadastro" component={Cadastro} />
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="CadastroForm" component={CadastroPessoal} />
        <Drawer.Screen name="VisualizacaoPerfil" component={VisualizacaoPerfil} />
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="CadastroAnimal" component={CadastroPetForm} />
        <Drawer.Screen name="EditarPerfil" component={EditarPerfil} />
        <Drawer.Screen name='SucessoAnimal' component={TelaSucessoAnimal} />
        <Drawer.Screen name='VisualizacaoAnimais' component={VisualizacaoAnimais} />
        <Drawer.Screen name='MeusAnimais' component={VisualizacaoAnimaisUsuario} />
        <Drawer.Screen name='DetalhesAnimal' component={DetalhesAnimal} />
        <Drawer.Screen name='Notificações' component={NotificationsScreen} />
        <Drawer.Screen name='Chat' component={ChatScreen} />
        <Drawer.Screen name='ListChats' component={ListChats} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
