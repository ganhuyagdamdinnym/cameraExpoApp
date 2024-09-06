import {
  Image,
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Animated,
} from "react-native";
import { PinchGestureHandler } from "react-native-gesture-handler";
//AIzaSyAvSdFuwZWqm9DutE4iyGJaU5-Tz2VwZe0

import { useEffect, useState } from "react";
import { googleFetch } from "@/utils/google-fetch";
import { appendData } from "@/utils/appendData";
import ImageViewer from "react-native-image-zoom-viewer";
import { Modal } from "react-native";
export default function HomeScreen() {
  const [name, setName] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [age, setAge] = useState<string>("");

  const onChangeName = (name: string) => {
    setName(name);
  };
  const handlerGetProductData = () => {
    googleFetch("product");
  };
  const handlerGetUserData = () => {
    googleFetch("user");
  };
  const onChangeAge = (age: string) => {
    setAge(age);
  };
  const newUserData = [
    ["Alice", "USA", "30"],
    ["Bob", "UK", "25"],
  ];
  // const handlerPinch = Animated.event([{ nativeEvent: { scale } }], {
  //   useNativeDriver: true,
  // });
  // appendData("user", newUserData);
  return (
    <View>
      <TextInput onChangeText={onChangeName} value={name} />
      <TextInput onChangeText={onChangeAge} value={age} />
      <View style={{ gap: 20 }}>
        <Pressable onPress={handlerGetUserData}>
          <Text>User</Text>
        </Pressable>
        <Pressable onPress={handlerGetProductData}>
          <Text>Product</Text>
        </Pressable>
      </View>
      <View style={styles.zoomingView}>
        <Pressable onPress={() => setVisible(true)} />
        <Modal visible={visible} transparent={true}>
          <Image source={require("../../assets/images/random.png")} />
          <Pressable onPress={() => setVisible(false)} />
        </Modal>
        {/* <PinchGestureHandler onGestureEvent={handlerPinch}>
          <Animated.Image
            source={require("../../assets/images/random.png")}
            style={(styles.imageStyle, { transform: [{ scale }] })}
          />
        </PinchGestureHandler> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  zoomingView: {
    width: 200,
    height: 200,

    backgroundColor: "red",
  },
  imageStyle: {
    width: 200,
    height: 200,
  },
});
