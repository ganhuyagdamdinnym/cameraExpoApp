import React, { useState, useEffect } from "react";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import * as Device from "expo-device";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

const WEATHER_API_KEY = "638b36e874f081ccd1132043b8e17210";
const BASE_WEATHER_URL = "http://api.openweathermap.org/data/2.5/weather?";

export default function Map() {
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [currentWeaherInfo, setCurrentWeatherInfo] = useState<any | null>(null);
  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && !Device.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      const weatherUrl = `${BASE_WEATHER_URL}lat=${location?.coords.latitude}&lon=${location.coords.longitude}&units=metric&appid=${WEATHER_API_KEY}`;
      const response = await fetch(weatherUrl);
      const result = await response.json();
      // Alert.alert("name", result.name);
      setCurrentWeatherInfo(result);
    })();
  }, []);

  if (currentWeaherInfo) {
    const {
      main: { temp },
      weather: [details],
      name,
    } = currentWeaherInfo;

    const { icon, main, description } = details;

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: location?.coords?.latitude || 37.78825,
            longitude: location?.coords?.longitude || -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
        >
          {location && (
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Your Location"
            />
          )}
        </MapView>
        {currentWeaherInfo ? (
          <View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Text>Your location:</Text>
              <Text style={{ fontSize: 20 }}>{name}</Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Text>temperature:</Text>
              <Text style={{ fontSize: 20 }}>{Math.round(temp)}°C</Text>
            </View>
            <Text style={{ fontSize: 20 }}>{main}</Text>
          </View>
        ) : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.6,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
  },
});
