import React from "react";
import { Image, Linking, TouchableOpacity, Text, View, StyleSheet } from "react-native";


const AppButton = ({title, url, tipo}) => {

    const handlePress = () =>{

        if (url) {
            Linking.openURL(url);
        }

    };

    let buttonStyle = null;
    let iconImage = null;

    if (tipo === 'facebook') {
        iconImage = require('../../../assets/facebook_icon.png');
        buttonStyle = styles.facebook_button;
    }

    else if (tipo === 'google') {

        iconImage = require('../../../assets/google_icon.png');
        buttonStyle = styles.google_button;

    }

    return (

        <TouchableOpacity onPress = {handlePress} style = {buttonStyle}>
            <Image source={iconImage} style = {styles.iconImage}/>
            <Text style = {styles.buttonText}>{title}</Text>
        </TouchableOpacity>

    )


};


const styles = StyleSheet.create({

    facebook_button: {
        backgroundColor: '#194F7C',
        width: 232,
        height: 40,
        textAlign: 'center',
        alignSelf:'center',
        paddingTop:10,
        marginTop: 20,
        flexDirection: 'row',

    },

    google_button: {
        backgroundColor: '#F15F5C',
        width: 232,
        height: 40,
        textAlign: 'center',
        alignSelf:'center',
        paddingTop:10,
        marginTop: 20,
        flexDirection: 'row',

    },

    iconImage: {
        width: 20,
        height: 20,
        marginLeft: 10,

    },

    buttonText: {

        textAlign: 'center',
        color: 'white',
        marginLeft: 20,

    }


})

export default AppButton;
