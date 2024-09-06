import React, { useState, useEffect } from "react";
import {
  Button,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  View,
  Platform,
  Pressable,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";

export default function App(this: any) {
  const [albums, setAlbums] = useState<any[]>([]);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  async function getAlbums() {
    setImageUrl(null);
    if (permissionResponse) {
      if (permissionResponse.status !== "granted") {
        await requestPermission();
      }
    }
    const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: true,
    });
    setAlbums(fetchedAlbums);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Button onPress={getAlbums} title="Get albums" />
      {imageUrl == null ? (
        <ScrollView>
          {albums &&
            albums.map((album) => (
              <AlbumEntry
                key={album.id}
                album={album}
                setImageUrl={setImageUrl}
                imageUrl={imageUrl}
              />
            ))}
        </ScrollView>
      ) : (
        <ReactNativeZoomableView
          maxZoom={1.5}
          minZoom={0.5}
          zoomStep={0.5}
          initialZoom={1}
          bindToBorders={true}
          onZoomAfter={this.logOutZoomState}
          style={{
            padding: 10,
            // backgroundColor: "red",
          }}
        >
          <Image
            source={{ uri: imageUrl }}
            style={{ width: "100%", height: 400 }}
          />
        </ReactNativeZoomableView>
      )}
    </SafeAreaView>
  );
}

type Props = {
  album: any;
  setImageUrl: any;
  imageUrl: string | null;
};
function AlbumEntry(this: any, props: Props) {
  const { album, setImageUrl, imageUrl } = props;
  const [assets, setAssets] = useState<any[]>([]);
  //const [imageUrl, setImageUrl] = useState<string | null>(null);
  useEffect(() => {
    async function getAlbumAssets() {
      const albumAssets = await MediaLibrary.getAssetsAsync({ album });
      setAssets(albumAssets.assets);
    }
    getAlbumAssets();
  }, [album]);
  const handlerImage = () => {};
  return (
    <View style={styles.albumContainer}>
      <Text>
        {album.title} - {album.assetCount ?? "no"} assets
      </Text>

      <View style={styles.albumAssetsContainer}>
        {assets &&
          assets.map((asset) => (
            <Pressable key={asset.id} onPress={() => setImageUrl(asset.uri)}>
              <Image
                source={{ uri: asset.uri }}
                style={{ width: 50, height: 50 }}
              />
            </Pressable>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    justifyContent: "center",
    ...Platform.select({
      android: {
        paddingTop: 40,
      },
    }),
  },
  albumContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
    gap: 4,
  },
  albumAssetsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
