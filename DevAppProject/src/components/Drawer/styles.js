import { StyleSheet } from 'react-native'

export const screenOptions = {
  headerTintColor: '#434343',
  headerStyle: {
    backgroundColor: '#88C9BF',
  },
}

export const styles = StyleSheet.create({
  drawerHeader: {
    flexDirection: 'column',
    alignItems: 'flex-start', 
    padding: 20, 
    backgroundColor: '#88c9bf',
    height:172,
    justifyContent: 'space-between',
  },
  text:{
    color: 'white',
    fontSize: 24,
    
  },
  drawerImage:{
    width: 70,
    height: 70,
    borderRadius: 25,
    marginRight: 10,
  
  },
  drawerItem: {
    borderBottomWidth: 1, // Adicione borda inferior
    borderColor: '#ccc', // Cor da borda
    backgroundColor: '#fff', // Cor de fundo
  },
  drawerItemLogout: {
    borderBottomWidth: 1, // Adicione borda inferior
    borderColor: '#ccc', // Cor da borda
    backgroundColor: '#88c9bf', // Cor de fundo
  },
  customLabel: {
    color: '#434343', // Cor do texto
    fontSize: 14, // Tamanho da fonte
    padding: 10, // Preenchimento
  },
})
