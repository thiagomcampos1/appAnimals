import React from "react";

import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const Header = ({ text, backgroundColor, topBarColor }) => {
  const navigation = useNavigation();
  return (
    <>
      <View style={[styles.topBar, { backgroundColor: topBarColor }]}></View>
      <View style={[styles.menuBar, { backgroundColor: backgroundColor }]}>
        {text !== " " && (
          <>
            <TouchableOpacity
              style={styles.menuIcon}
              onPress={() =>
                navigation.canGoBack
                  ? navigation.goBack()
                  : navigation.navigate("Cadastro")
              }
            >
              <Icon name="arrowleft" type="antdesign" color="#434343" />
            </TouchableOpacity>
            <Text style={styles.menuBarText}>{text}</Text>
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  topBar: {
    height: 24,
    textAlign: "center",
  },
  menuBar: {
    textAlign: "center",
    minHeight: 56,
    flexDirection: "row",
    paddingTop: 16,
  },
  menuBarText: {
    color: "#434343",
    fontSize: 20,
  },
  menuIcon: {
    marginRight: 16,
    marginLeft: 16,
  },
});

export default Header;
