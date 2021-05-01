import React, { useMemo } from "react";
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
    <View style={styles.container}>
      <Text style={className} onPress={() => changeDoneHandler(item.key)}>
        {item.text}
      </Text>
      <MaterialIcons
        name="delete"
        size={18}
        style={styles.deleteIcon}
        color="#333"
        onPress={() => pressRemoveHandler(item.key)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    padding: 16,
    marginTop: 16,
    borderColor: "#bbb",
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: "row",
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
