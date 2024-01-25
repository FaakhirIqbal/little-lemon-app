import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { colors } from "../../../constants/color";

const CustomButton = ({ text, style, textStyle, ...args }) => {
  return (
    <Pressable style={[styles.button, style]} {...args}>
      <Text style={[styles.text, textStyle]}>
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.PRIMARY_COLOR, // Updated color
    borderColor: colors.PRIMARY_COLOR, // Updated color
    borderWidth: 2
  },
  text: {
    color: colors.TEXT_COLOR, // Updated color
    justifyContent: "center",
    fontWeight: "bold"
  }
});

export default CustomButton;
