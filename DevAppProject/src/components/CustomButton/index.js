import React from "react";
import { TouchableOpacity,Text, StyleSheet, Linking} from 'react-native';

const EntrarButton = ({onPress,title,url}) =>{


   return ( 
   
   <TouchableOpacity onPress = {onPress} style = {styles.button}>
        <Text style = {styles.buttonText}>{title}</Text>
    </TouchableOpacity>
   )

   };

const styles = StyleSheet.create ({

    
    button: {
        backgroundColor: '#88C9BF',
        width: 232,
        height: 40,
        textAlign: 'center',
        alignSelf: 'center',
        paddingTop: 10,
        marginBottom: 20, // Adicione margem inferior para separar os botões
      },

    buttonText: {
        textAlign: 'center',

    }

})

export default EntrarButton;
