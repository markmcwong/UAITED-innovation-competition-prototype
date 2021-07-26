import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Pressable,
  StatusBar,
  VStack,
  Text,
} from "native-base";
import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "../components/Themed";
import {
  Animated,
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import { logout } from "../services/auth";
import { useEffect } from "react";
import { getHistory } from "../services/firestore";
import { connect } from "react-redux";
import firebase from "firebase";
import "firebase/firestore";

export const data = [
  { name: "1st", prize: "Pineapple aiPhone 20 Max Pro" },
  { name: "2nd", prize: "Knockia Keyboard" },
  { name: "3rd", prize: "IG Mouse" },
];

const SecondRoute = (props: any) => (
  <ScrollView w="100%">
    <VStack
      alignItems="center"
      width={Dimensions.get("window").width}
      height="100%"
      space={5}
      marginTop={3}
      paddingBottom={20}
    >
      <ImageBackground
        resizeMode="contain"
        source={require("../assets/images/reward.png")}
        style={{ ...styles.rewards, justifyContent: "center" }}
      >
        {/* <VStack space={4} > */}
        {/* <Text
            style={{
              alignSelf: "center",
              marginTop: "5%",
              marginLeft: "-35%",
              // fontWeight: "bold",
              color: "white",
              fontSize: 14,
            }}
          >
            Current Reward Points:
          </Text> */}
        <Text
          textAlign="center"
          style={{
            // marginTop: "5%",
            alignSelf: "center",
            fontWeight: "600",
            color: "white",
            fontSize: 20,
          }}
        >
          {"Seasonal\nLucky Draw"}
          {/* {props.reward} */}
        </Text>
        {/* </VStack> */}
      </ImageBackground>
      <View
        style={{
          borderWidth: 3,
          borderColor: "green",
          width: "80%",
          borderRadius: 15,
          padding: 15,
          backgroundColor: "transparent",
        }}
      >
        <VStack space={3} style={{ padding: 7.5 }}>
          <Text
            fontSize={20}
            paddingBottom={3}
            fontWeight="600"
            style={{ color: "green" }}
          >
            Prizes
          </Text>
          {data.map((x) => (
            <VStack justifyContent="space-between" space={2} key={x.name}>
              <HStack>
                {/* <View
                  style={{
                    alignSelf: "center",
                    height: 3,
                    width: 3,
                    backgroundColor: "#438672",
                    marginRight: 8,
                  }}
                /> */}
                <Text style={{ fontSize: 14, ...styles.bulletPoints }}>
                  {x.name}
                </Text>
              </HStack>
              <Text
                paddingLeft={7}
                style={{ ...styles.bulletPoints, fontWeight: "bold" }}
              >
                {x.prize}
              </Text>
            </VStack>
          ))}
        </VStack>
      </View>
      <ImageBackground
        resizeMode="contain"
        source={require("../assets/images/reward.png")}
        style={{ ...styles.rewards, justifyContent: "center" }}
      >
        <Text
          textAlign="center"
          style={{
            // marginTop: "5%",
            alignSelf: "center",
            fontWeight: "600",
            color: "white",
            fontSize: 20,
          }}
        >
          {"Scholarship"}
        </Text>
      </ImageBackground>

      <View
        style={{
          borderWidth: 3,
          borderColor: "green",
          width: "80%",
          borderRadius: 15,
          padding: 25,
          backgroundColor: "transparent",
        }}
      >
        <VStack space={5}>
          <Text
            lineHeight={25}
            style={{ ...styles.bulletPoints, fontSize: 16 }}
          >
            {
              "To facilitate industry-academia collaboration and nurture more technology talent, GME would set up a scholarship (HK$50,000) for local tertiary engineering students.\n\nApplicant with excel academic result and having enthusiasm in engineering subject are eligible to apply."
            }
          </Text>
          {/* <VStack alignItems="center" space={3}>
            <HStack>
              <Text
                style={{
                  alignSelf: "center",
                  fontWeight: "bold",
                  color: "#438672",
                  fontSize: 28,
                }}
              >
                150
              </Text>
              <Text style={{ marginLeft: 3, fontSize: 16, color: "grey" }}>
                pts
              </Text>
            </HStack>
            <Text style={{ color: "grey", lineHeight: 22.5 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim
              aliquam tempus vulputate vestibulum eget sit vel tincidunt sit.
              Quis faucibus in interdum arcu quis.
            </Text>
          </VStack>
          <VStack alignItems="center" space={3}>
            <HStack>
              <Text
                style={{
                  alignSelf: "center",
                  fontWeight: "bold",
                  color: "#438672",
                  fontSize: 28,
                }}
              >
                300
              </Text>
              <Text style={{ marginLeft: 3, fontSize: 16, color: "grey" }}>
                pts
              </Text>
            </HStack>
            <Text style={{ color: "grey", lineHeight: 22.5 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim
              aliquam tempus vulputate vestibulum eget sit vel tincidunt sit.
              Quis faucibus in interdum arcu quis.
            </Text>
          </VStack> */}
        </VStack>
      </View>
    </VStack>
  </ScrollView>
);

const FirstRoute = (user: any) => {
  const [history, setHistory] = React.useState(null);
  useEffect(() => {
    getHistory(user, (data: any) => setHistory(data));
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <VStack alignItems="center" paddingBottom="20">
        {history &&
          history.map((x: any) => (
            <VStack
              style={{
                borderWidth: 3,
                borderColor: "green",
                width: "80%",
                borderRadius: 15,
                paddingTop: 10,
                paddingBottom: 25,
                marginBottom: 15,
                paddingHorizontal: 25,
                backgroundColor: "transparent",
              }}
              key={x.id}
            >
              <HStack justifyContent="space-between">
                <VStack space={1}>
                  <Text style={styles.title}>Transaction No:</Text>
                  <Text style={styles.info}>{x.id}</Text>
                  <Text style={styles.title}>Date:</Text>
                  <Text style={styles.info}>
                    {
                      (x._createdAt as firebase.firestore.Timestamp)
                        .toDate()
                        .toLocaleString("en-GB", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        })
                      // .slice(0, -3)
                    }
                  </Text>
                </VStack>
                <VStack space={1}>
                  <Text style={styles.title}>Recycled Object:</Text>
                  <Text style={styles.info}>{x.recycledObject}</Text>
                  <Text style={styles.title}>Reward Points:</Text>
                  <Text style={styles.info}>{x.points}</Text>
                </VStack>
              </HStack>
              <VStack space={1}>
                <Text style={styles.title}>Location:</Text>
                <Text style={styles.info}>{x.location}</Text>
                <Text style={{ ...styles.info, fontWeight: "300" }}>
                  {x.address}
                </Text>
              </VStack>
            </VStack>
          ))}
      </VStack>
    </ScrollView>
  );
};

const mapStateToSchemeProps = (state: any, props: any) => {
  console.log(state.user);
  return { reward: state.user.reward };
};

// const mapHistoryToSchemeProps = (state: any, props: any) => {
//   return {};
// };

const mapStateToProps = (state: any, props: any) => {
  return { user: state.user };
};

const ProfileScreen = (props: any) => {
  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState([
    { key: "History", title: "History" },
    { key: "SchemeDetails", title: "Scheme Details" },
  ]);
  const initialLayout = { width: Dimensions.get("window").width };
  const renderScene = SceneMap({
    History: () => FirstRoute(props.user),
    SchemeDetails: connect(mapStateToSchemeProps)(SecondRoute),
  });

  const renderTabBar = (props: any) => {
    const inputRange = props.navigationState.routes.map(
      (x: any, i: number) => i
    );

    return (
      <Box
        flexDirection="row"
        w={Dimensions.get("window").width * 0.7}
        borderRadius={15}
        padding={1}
        marginTop={4}
        marginBottom={4}
        marginLeft={Dimensions.get("window").width * 0.15}
        marginRight={Dimensions.get("window").width * 0.15}
      >
        {props.navigationState.routes.map((route: any, i: number) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex: any) =>
              inputIndex === i ? 1 : 0.5
            ),
          });

          return (
            <Box
              flex={1}
              alignItems="center"
              p={2}
              key={i}
              borderTopLeftRadius={i == 0 ? 20 : 0}
              borderBottomLeftRadius={i == 0 ? 20 : 0}
              borderBottomRightRadius={i == routes.length - 1 ? 20 : 0}
              borderTopRightRadius={i == routes.length - 1 ? 20 : 0}
              backgroundColor={index == i ? "#438672" : "transparent"}
              borderColor="#438672"
              borderWidth={2}
            >
              <Pressable
                onPress={() => {
                  console.log(i);
                  setIndex(i);
                }}
              >
                <Animated.Text
                  style={{
                    opacity,
                    color: index != i ? "#438672" : "#FFF",
                    fontWeight: "600",
                  }}
                >
                  {route.title}
                </Animated.Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };
  return (
    <SafeAreaView>
      <VStack
        alignItems="center"
        width={Dimensions.get("window").width}
        height="100%"
        w="100%"
        marginTop={3}
      >
        <HStack style={styles.topBar}>
          <Text style={{ fontSize: 24, color: "#438672", fontWeight: "600" }}>
            Profile
          </Text>
          <Icon
            size="sm"
            as={<AntDesign name="logout" />}
            color="black"
            onPress={() => logout()}
          />
        </HStack>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          style={{
            marginTop: StatusBar.currentHeight,
            // width: "100%",
            // justifyContent: "center",
          }}
        />
      </VStack>
    </SafeAreaView>
  );
};

export default connect(mapStateToProps)(ProfileScreen);
const styles = StyleSheet.create({
  topBar: {
    justifyContent: "space-between",
    width: "80%",
  },
  rewards: {
    width: "100%",
    height: 125,
  },
  bulletPoints: {
    color: "#438672",
    fontWeight: "500",
  },
  title: {
    fontWeight: "300",
    opacity: 0.89,
    marginTop: 15,
  },
  info: {
    fontWeight: "bold",
    color: "#438672",
  },
});
