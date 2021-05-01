import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import AddItem from "./components/addItem";
import Header from "./components/header";
import Item from "./components/item";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ItemProp = Array<{ text: string; key: string; done: boolean }>;

export default function App() {
  const [items, setItems] = useState<ItemProp>([]);

  const pressRemoveHandler = useCallback(
    (key: string) => {
      setItems((prevItems) => {
        return prevItems.filter((todo) => todo.key != key);
      });
    },
    [items]
  );

  const submitHandler = (text: string) => {
    if (text.length > 3) {
      setItems((prevItems) => {
        return [
          { text: text, key: Math.random().toString(), done: false },
          ...prevItems,
        ];
      });
    } else {
      Alert.alert("Sorry", "Item must be at least 3 characters long", [
        { text: "Understood", onPress: () => console.log("alert closed") },
      ]);
    }
  };

  const changeDoneHandler = (key: string) => {
    setItems(
      items.map((item) => {
        if (item.key === key) return { ...item, done: !item.done };
        return item;
      })
    );
  };

  const storeData = async (value: ItemProp) => {
    try {
      const jsonValue = JSON.stringify(value);

      await AsyncStorage.setItem("@Items", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    storeData(items);
    return () => {};
  }, [items]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@Items");

      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setItems([]);
    getData().then((value: ItemProp) => {
      value.forEach((element) => {
        setItems((prevItems) => {
          return [
            { text: element.text, key: element.key, done: element.done },
            ...prevItems,
          ];
        });
      });
    });

    return () => {};
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        console.log("dismissed");
      }}
    >
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <AddItem submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={items}
              renderItem={({ item }) => (
                <Item
                  item={item}
                  pressRemoveHandler={pressRemoveHandler}
                  changeDoneHandler={changeDoneHandler}
                />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 40,
    flex: 1,
  },
  list: {
    marginTop: 20,
    flex: 1,
  },
});
