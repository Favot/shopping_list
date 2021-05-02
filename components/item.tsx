import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const getClassName = (done: boolean) => {
  return done === false ? styles.text : styles.textCrossed;
};

type ItemProp = {
  item: {
    text: string;
    key: string;
    done: boolean;
  };
  pressRemoveHandler: (key: string) => void;
  changeDoneHandler: (key: string) => void;
};

export default function Item({
  item,
  pressRemoveHandler,
  changeDoneHandler,
}: ItemProp) {
  const className = getClassName(item.done);

  console.log(className);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => changeDoneHandler(item.key)}
    >
      <Text style={className}>{item.text}</Text>
      <MaterialIcons
        name="delete"
        size={18}
        style={styles.deleteIcon}
        color="#333"
        onPress={() => pressRemoveHandler(item.key)}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginTop: 16,
    borderColor: "#bbb",
    borderWidth: 1,
    borderRadius: 5,
    padding: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  text: {
    flex: 1,
  },
  textCrossed: {
    flex: 1,
    textDecorationLine: "line-through",
  },
  deleteIcon: {
    alignSelf: "flex-end",
  },
});
