import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Alert,
  Pressable,
} from "react-native";
import { Camera, CameraView } from "expo-camera";
import { Video } from "expo-av";
import * as MediaLibrary from "expo-media-library";

export default function takevideo() {
  const [hasAudioPermission, setHasAudioPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState<any>(null);
  const [record, setRecord] = useState("");
  //   const [type, setType] = useState(Camera.Constants.Type.back);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const takeVideo = async () => {
    if (camera) {
      if (camera) {
        try {
          const data = await camera.recordAsync({
            maxDuration: 10,
          });
          setRecord(data.uri);
          if (hasCameraPermission) {
            await MediaLibrary.createAssetAsync(data.uri);
            Alert.alert("Video saved to gallery");
          }
        } catch (error) {
          Alert.alert("Error", "Failed to record video.");
        }
      } else {
        Alert.alert("Error", "Camera is not ready.");
      }
    }
  };
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <CameraView
        ref={(ref) => setCamera(ref)}
        style={{ width: 200, height: 200 }}
      />
      <Video
        ref={video}
        source={{
          uri: record,
        }}
        style={{ width: "50%", height: "50%" }}
        useNativeControls
        // resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <Pressable onPress={() => takeVideo()} style={{ backgroundColor: "red" }}>
        <Text>hpui</Text>
      </Pressable>
    </View>
  );
}
