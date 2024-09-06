import {
  CameraView,
  CameraType,
  useCameraPermissions,
  Camera as ExpoCamera,
} from "expo-camera";
import { Video } from "expo-av";
import { useEffect, useState, useRef } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import {
  VideoQuality,
  VideoStabilization,
  VideoCodec,
} from "expo-camera/build/legacy/Camera.types";

export default function Camera() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [videoMode, setVideoMode] = useState<string | undefined>("off");
  const [video, setVideo] = useState<string | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [videoRecording, setVideoRecording] = useState<boolean>(false);
  const [permissionResponse, requestPermissio] = MediaLibrary.usePermissions();

  const camera = useRef<any>(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={{ justifyContent: "center" }}>
        <Text style={{ justifyContent: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const handlerVideo = async () => {
    if (videoRecording) {
      camera.current.stopRecording();
      setVideoRecording(false);
      alert("hi");
    } else {
      if (camera.current) {
        setVideoRecording(true);
        try {
          const video = await camera.current.recordAsync({
            quality: VideoQuality["1080p"],
            maxDuration: 60,
            VideoCodec: VideoCodec["H264"],
          });
          await MediaLibrary.createAssetAsync(video.uri);
          Alert.alert("Video Saved", video.uri);
        } catch (error) {
          Alert.alert("Error recording video");
          setVideoRecording(false);
        }
      } else {
        Alert.alert("Camera not available");
      }
    }
  };
  const takePicture = async () => {
    if (camera.current) {
      try {
        const options = { quality: 0.5, base64: true };
        // const { uri } = await Camera.takePictureAsync();
        const photo = await camera.current.takePictureAsync(options);
        const asset = await MediaLibrary.createAssetAsync(photo.uri);
        // const photo = await cameraRef.current.takePictureAsync();
        Alert.alert("url", photo.uri);
        console.log(photo.uri);
      } catch (error) {
        Alert.alert("Error taking picture");
      }
    } else {
      Alert.alert(
        "Camera not available",
        "The camera reference is not available."
      );
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        ref={camera}
        videoStabilizationMode={VideoStabilization.auto}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take a picture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handlerVideo}>
            <Text style={styles.text}>
              {videoRecording ? "stop video" : "record video"}
            </Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
