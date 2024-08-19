import React from 'react';
import { View, StyleSheet } from 'react-native';

const Retangulo = () => {
  return (
    <View style={styles.retangulo}></View>
  );
};

const styles = StyleSheet.create({
  retangulo: {
    width: '100%',
    height: 50,
    backgroundColor: '#88C9BF', 
},
});

export default Retangulo;
