import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Box,
  Button,
  CheckIcon,
  HStack,
  Icon,
  Image,
  Input,
  Pressable,
  ScrollView,
  Select,
  VStack,
  Text,
} from "native-base";
import * as React from "react";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "../components/Themed";
import store from "../state/store";

export const coordinatesList = [
  {
    coordinates: {
      latitude: 22.3193,
      longitude: 114.1694,
    },
    name: "My Location",
    address: "My Current Location",
  },
  {
    name: "Mei Foo MTR Exit A",
    address: "Kwai Chung Rd, Lai Chi Kok, Hong Kong",
    coordinates: {
      latitude: 22.336713326750214,
      longitude: 114.14015190592364,
    },
  },
  {
    name: "Kwun Tong APM",
    address: "418 Kwun Tong Rd, Kwun Tong, Hong Kong",
    coordinates: {
      latitude: 22.312184896480446,
      longitude: 114.22510634223181,
    },
  },
  {
    name: "V City",
    address: "83 Tuen Mun Heung Sze Wui Rd, San Hui, Hong Kong",
    coordinates: {
      latitude: 22.395417529322085,
      longitude: 113.97394382913629,
    },
  },
  {
    name: "Taikoo Citiplaza",
    address: "18 Tai Koo Shing Rd, Quarry Bay, Hong Kong",
    coordinates: {
      latitude: 22.286711043147164,
      longitude: 114.21748772849726,
    },
  },
  {
    name: "East Point City",
    address: "8 Chung Wa Rd, Tseung Kwan O, Hong Kong",
    coordinates: {
      latitude: 22.316410046553532,
      longitude: 114.26533267141153,
    },
  },
  {
    name: "Lee Theatre",
    address: "99 Percival St, Causeway Bay, Hong Kong",
    coordinates: {
      latitude: 22.27820844420086,
      longitude: 114.18337491788904,
    },
  },
  {
    name: "YOHO Mall II",
    address: "8 Long Yat Road, Yuen Long, Hong Kong",
    coordinates: {
      latitude: 22.44582808220941,
      longitude: 114.03526771635173,
    },
  },
];

export default function SelectKioskScreen({ navigation, route }) {
  const [location, setLocation] = useState(route.params.currentItem);

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    console.log("route : " + JSON.stringify(route.params));
  }, []);

  return (
    <SafeAreaView flex={1} backgroundColor="#438672">
      <View
        style={{
          flex: 1,
          backgroundColor: "#438672",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 15,
        }}
      >
        <View
          style={{
            flex: 1,
            width: "100%",
            marginVertical: 20,
            borderRadius: 15,
            backgroundColor: "#438672",
            paddingHorizontal: 20,
          }}
        >
          <HStack space={4}>
            <Icon
              as={MaterialCommunityIcons}
              name="arrow-left"
              color="#FFF"
              size={8}
              onPress={() => navigation.goBack()}
            />
            <VStack space={1}>
              <Text style={{ fontSize: 28, color: "#FFF", fontWeight: "500" }}>
                Select Kiosk
              </Text>
              <Text style={{ fontSize: 14, color: "#FFF", fontWeight: "400" }}>
                Click the location to select kiosk
              </Text>
            </VStack>
          </HStack>
          <ScrollView>
            <VStack marginTop={35} space={8} flex={1} alignItems="center">
              <Select
                //   selectedValue={language}
                minWidth={200}
                accessibilityLabel="Country"
                placeholder="Hong Kong"
                variant="filled"
                // marginTop={5}
                _selectedItem={{
                  bg: "cyan.600",
                  endIcon: <CheckIcon size={4} />,
                }}
                placeholderTextColor="#438672"
                backgroundColor="#FFF"
                borderRadius={30}
              >
                <Select.Item label="Singapore" value="sg" />
                <Select.Item label="Taiwan" value="tw" />
                <Select.Item label="Hong Kong" value="hk" />
                <Select.Item label="Malaysia" value="my" />
              </Select>

              <VStack space={3} width="100%" flex={1} alignItems="center">
                {coordinatesList.slice(1).map((x) => (
                  <Pressable
                    backgroundColor={x.name == location ? "#FFF4D9" : "#FFF"}
                    w="100%"
                    flex={1}
                    // h="10%"
                    key={x.name}
                    style={{
                      alignItems: "flex-end",
                      justifyContent: "center",
                    }}
                    padding={6}
                    borderRadius={25}
                    onPress={() => {
                      console.log("clicked");
                      store.dispatch({
                        type: "SELECT_LOCATION",
                        location: x.name,
                        coordinates: x.coordinates,
                      });
                      navigation.goBack();
                    }}
                  >
                    <Text
                      style={{
                        color: "#438672",
                        fontWeight: "bold",
                        fontSize: 16,
                        width: "100%",
                      }}
                    >
                      {x.name}
                    </Text>
                    <Text
                      textAlign="left"
                      style={{
                        color: "#438672",
                        fontWeight: "400",
                        fontSize: 14,
                        width: "100%",
                        marginTop: 4,
                      }}
                    >
                      {x.address}
                    </Text>
                  </Pressable>
                ))}
              </VStack>
            </VStack>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
