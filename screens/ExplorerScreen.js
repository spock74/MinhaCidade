/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from "react";
import useForceUpdate from "use-force-update";
import { useIsFocused } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import MapView,  {Callout, PROVIDER_GOOGLE } from "react-native-maps";

import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { getAllPlacesSql } from "../util/database";
import { db2 } from "../util/database";
//******* */
import { mapDarkStyle, mapStandardStyle } from "../models/mapData";
// import { Images, mapDarkStyle, mapStandardStyle } from "../models/mapData";
//******* */
import StarRating from "../components/StarRating";

import { useTheme } from "@react-navigation/native";
import { Colors } from "../constants/Colors";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

function ExplorerScreen() {
  const isFocused = useIsFocused();
  const [] = useState([]);
  const theme = useTheme();

  const categories = [
    {
      name: "Água e Esgotos",
      icon: <Ionicons style={styles.chipsIcon} name="ios-water" size={18} />,
      color: "#FF6347",
    },
    {
      name: "Vias Públicas",
      icon: <FontAwesome name="road" style={styles.chipsIcon} size={18} />,
      color: "blue",
    },
    {
      name: "Focos de Dengue",
      icon: (
        <Ionicons name="md-restaurant" style={styles.chipsIcon} size={18} />
      ),
      color: "green",
    },
    {
      name: "Escolas",
      icon: (
        <MaterialCommunityIcons
          name="food"
          style={styles.chipsIcon}
          size={18}
        />
      ),
      color: "red",
    },
    {
      name: "Saúde",
      icon: <Fontisto name="hotel" style={styles.chipsIcon} size={15} />,
      color: "orange",
    },
  ];

  const [region, setRegion] = useState({
    latitude: -20.763050885254362,
    longitude: -42.8818544663478,
    latitudeDelta: 0.09864195044303443 / 1.6,
    longitudeDelta: 0.090142817690068 / 1.6,
  });

  const [markers, setMarkers] = useState([
    {
      latitude: -20.745646384023,
      longitude: -42.88733714762861,
      title: "Vazamento na rua",
      description: "Marco Zero",
      image: null,
      rating: 3,
      reviews: 99,
      address: "--",
      _id: "",
      timestamp: null,
      user: "",
      destination: "",
      date: "",
    },
  ]);

  const forceUpdate = useForceUpdate();
  const c = useCallback(() => {
    forceUpdate();
  }, [forceUpdate]);

  useEffect(() => {
    if(isFocused) {
      db2
      .allDocs({ include_docs: true })
      .then((result) => {
        setMarkers(result.rows.map((row) => row.doc));
        // console.log(">>>>>> aaaaaaa --- ", markers);
      })
      .catch((err) => {
        console.log("err db2 allDocs: ", err);
      });
    }
  }, [isFocused]);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  const multiplierfactor = 1 / 4;
  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= markers.length) {
        index = markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { latitude, longitude } = markers[index];
          _map.current.animateToRegion(
            {
              latitude,
              longitude,
              latitudeDelta: region.latitudeDelta * multiplierfactor,
              longitudeDelta: region.longitudeDelta * multiplierfactor,
            },
            1500
          );
        }
      }, 10);
    });
  });

  const interpolations = markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.7, 1],
      extrapolate: "clamp",
    });

    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === "ios") {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  };

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        initialRegion={region}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        customMapStyle={theme.dark ? mapDarkStyle : mapStandardStyle}
      >
        {markers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <MapView.Marker
              key={index}
              coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
              onPress={(e) => onMarkerPress(e)}
            >
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require("../assets/map_marker.png")}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            <Callout>
              <View  style={styles.plainView}>
                <Text>Endereço: {marker.address}</Text>
              </View>
            </Callout>
            </MapView.Marker>
          );
        })}
      </MapView>
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Busca"
          placeholderTextColor="#000"
          autoCapitalize="none"
          style={{ flex: 1, padding: 0 }}
        />
        <Ionicons name="ios-search" size={20} />
      </View>
      <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={50}
        style={styles.chipsScrollView}
        contentInset={{
          // iOS only
          top: 0,
          left: 0,
          bottom: 0,
          right: 20,
        }}
        contentContainerStyle={{
          paddingRight: Platform.OS === "android" ? 20 : 0,
        }}
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            onPress={() => {
              if (index === 1) {
                c();
              }

              if (index === 0) {
                setRegion((curState) => {
                  curState = {
                    latitude: -20.763050885254362,
                    longitude: -42.8818544663478,
                    latitudeDelta: 0.09864195044303443 / 1.6,
                    longitudeDelta: 0.090142817690068 / 1.6,
                  };

                  clearTimeout(regionTimeout);

                  const regionTimeout = setTimeout(() => {
                    if (mapIndex !== index) {
                      mapIndex = index;
                      const { latitude, longitude } = markers[index];
                      _map.current.animateToRegion(
                        {
                          latitude,
                          longitude,
                          latitudeDelta: region.latitudeDelta,
                          longitudeDelta: region.longitudeDelta,
                        },
                        1500
                      );
                    }
                  }, 10);

                  return curState;
                });
              }
            }}
            key={index}
            style={[styles.chipsItem, { backgroundColor: category.color }]}
          >
            {category.icon}
            <Text style={{ color: "#fff" }}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === "android" ? SPACING_FOR_CARD_INSET : 0,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        { markers.map((marker, index) => (
          <View style={styles.card} key={index}>
            <Image
              source={{ uri: marker.image }}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>
                Título: {marker.title}
              </Text>
              <Text numberOfLines={1} style={styles.cardtitle}>
                Data: {new Date(marker.date).toLocaleDateString()}{" "}Horário:{" "}{new Date(marker.date).toLocaleTimeString()}
              </Text>
              <Text numberOfLines={1} style={styles.cardtitle}>
                Usuário: {marker.user}
              </Text>
              <Text numberOfLines={1} style={styles.cardtitle}>
                Endereco: {marker.address}
              </Text>
              <StarRating ratings={marker.rating} reviews={marker.reviews} />
              {/* <Text numberOfLines={1} style={styles.cardDescription}>
                {marker.description}
              </Text> */}
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
}

export default ExplorerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  plainView: {
    width: 250,
    height: 100,
    backgroundColor: Colors.pri
  },
  searchBox: {
    position: "absolute",
    marginTop: Platform.OS === "ios" ? 40 : 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position: "absolute",
    top: Platform.OS === "ios" ? 90 : 80,
    paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 0,
    color: "#fff",
  },
  chipsItem: {
    flexDirection: "row",
    // backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: "center",
    marginTop: 5,
  },
  signIn: {
    width: "100%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  textSign: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
