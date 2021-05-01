import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";

type AddItemProp = {
  submitHandler: any;
};

export default function AddItem(props: AddItemProp) {
  const [text, setText] = useState("");

  const changeHandler = (val: string) => {
    setText(val);
  };

  const pressHandler = () => {
    props.submitHandler(text);
    setText("");
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="new Item..."
        onChangeText={changeHandler}
        value={text}
      />
      <Button color="coral" onPress={pressHandler} title="add Item" />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
