import * as React from "react";
import { useEffect, useState } from "react";
import { Appearance, Dimensions, SafeAreaView, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

import EditScreenInfo from "../components/EditScreenInfo";
import { View } from "../components/Themed";
import {
  Button,
  Divider,
  HStack,
  Icon,
  Input,
  VStack,
  Text,
  Image,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapViewDirections from "react-native-maps-directions";
import { createStackNavigator } from "@react-navigation/stack";
import SelectKioskScreen, { coordinatesList } from "./SelectKioskScreen";
import { connect } from "react-redux";

const mapStateToProps = (state: any, props: any) => {
  return { location: state.location, coordinates: state.coordinates };
};

function MapScreen(props: any, { navigation }) {
  const [location, setLocation] = useState({
    coords: { latitude: 22.3193, longitude: 114.1694 },
  });
  const [errorMsg, setErrorMsg] = useState(null);
  let mapRef: any;
  useEffect(() => {
    // console.log(props);
    if (props.location != null) {
      console.log(props.location);
      mapRef.fitToSuppliedMarkers(["My Location", location]);
    }
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location?.coords.latitude,
          longitude: location?.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        ref={(map) => {
          mapRef = map;
        }}
        showsUserLocation={true}
        onMapReady={() =>
          mapRef.fitToSuppliedMarkers([
            "My Location",
            props.location ?? "My Location",
          ])
        }
      >
        <MapViewDirections
          origin={coordinatesList[0].coordinates}
          destination={
            props.location != null && props.coordinates
            // : coordinatesList[1].coordinates
          }
          apikey={"AIzaSyB-om0RhxVQnzzuSTYY-HtZLAbwxDOQplM"} // insert your API Key here
          strokeWidth={3}
          optimizeWaypoints={true}
          strokeColor="#2F80ED"
        />
        <Marker
          key={100}
          coordinate={coordinatesList[0].coordinates}
          title={coordinatesList[0].name}
          description={coordinatesList[0].address}
          identifier={coordinatesList[0].name}
        >
          <Image
            alt="map"
            source={require("../assets/images/map.png")}
            style={{ height: 20, width: 20 }}
          />
        </Marker>
        {coordinatesList.slice(1).map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinates}
            title={marker.name}
            description={marker.address}
            identifier={marker.name}
            pinColor={marker.name == props.location ? "orange" : "red"}
          />
        ))}
        {/* {props.location && (
          <Marker
            key={props.location}
            coordinate={props.coordinates}
            title={props.location}
            identifier={props.location}
          />
        )} */}
      </MapView>
      <View
        style={{
          position: "absolute",
          width: Dimensions.get("window").width,
          height: "24%",
          bottom: 0,
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
          // backgroundColor: "#FFF",
          backgroundColor: "#438672",
          padding: 35,
          // alignItems: "flex-end",
          flex: 1,
        }}
      >
        <VStack
          reversed={true}
          space={3}
          style={{
            position: "absolute",
            bottom: 10,
            paddingHorizontal: 40,
            paddingBottom: 25,
            width: Dimensions.get("window").width,
            alignItems: "center",
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
          }}
        >
          {/* <Button
            style={{
              backgroundColor: "white",
              width: "50%",
              marginTop: 15,
              borderRadius: 30,
            }}
            // onPress={() => props.navigation.navigate("KioskPopup")}
          >
            <Text style={{ color: "#438672", fontWeight: "bold" }}>GO</Text>
          </Button> */}
          <HStack
            borderRadius={10}
            padding={1}
            style={{ backgroundColor: "white", alignItems: "center" }}
            // paddingRight={3}
            width="100%"
            paddingLeft={2}
          >
            <Text style={{ width: 55, textAlign: "center" }}>To:</Text>
            <Divider orientation="vertical" />
            <Button
              variant="unstyled"
              paddingTop={3}
              paddingLeft={15}
              // paddingRight={}
              justifyContent="space-between"
              flex={1}
              onPress={() =>
                props.navigation.navigate("KioskPopup", {
                  currentItem: props.location,
                })
              }
              alignItems="center"
              width={Dimensions.get("window").width}
            >
              <HStack
                width="100%"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text fontSize={13}>
                  {props.location ?? "Pick from the map or from the list"}
                </Text>
                <Icon
                  as={MaterialCommunityIcons}
                  name="menu"
                  color="#57B894"
                  size={6}
                />
              </HStack>
            </Button>
          </HStack>
          <HStack
            borderRadius={10}
            padding={2}
            style={{ backgroundColor: "white", alignItems: "center" }}
            paddingRight={3}
            width="100%"
            paddingLeft={2}
          >
            <Text style={{ width: 55, textAlign: "center" }}>From:</Text>
            <Divider orientation="vertical" />
            <Input
              variant="unstyle"
              placeholder="Pick from the map or from the list"
              value="Your Location"
              style={{
                fontSize: 13,
              }}
              isDisabled={true}
              flex={1}
            ></Input>
          </HStack>
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              alignSelf: "flex-start",
              fontSize: 16,
            }}
          >
            Find the route to the kiosk
          </Text>
        </VStack>
        {/* <View
        style={{
          position: "absolute",
          top: 50,
          left: 30,
          width: 30,
          height: 30,
          backgroundColor: "white",
        }}
      > */}
      </View>
      <Icon
        as={MaterialCommunityIcons}
        name="arrow-left"
        color={Appearance.getColorScheme() === "dark" ? "#FFF" : "#000"}
        size={10}
        // marginTop={100}
        // left={30}
        style={{ position: "absolute", top: 40, left: 30 }}
        onPress={() => {
          props.navigation.goBack() ?? props.navigation.navigate("TabOne");
        }}
      />
      {/* </View> */}
    </View>
  );
}
const MapNavigator = createStackNavigator();
const TabTwoScreen = () => (
  <MapNavigator.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="Landing"
    mode="modal"
  >
    <MapNavigator.Screen
      name="Map"
      component={connect(mapStateToProps)(MapScreen)}
    />
    <MapNavigator.Screen name="KioskPopup" component={SelectKioskScreen} />
  </MapNavigator.Navigator>
);
export default TabTwoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#57B894",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.8,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
