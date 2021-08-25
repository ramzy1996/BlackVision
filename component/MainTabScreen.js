import * as React from "react";
import DetailScreen from "./NotificationScreen";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
import ExploreScreen from "./ExploreScreen";
import MapScreen from "./MapScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Ionicons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

// const HomeStack = createNativeStackNavigator();
// const DetailStack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

// const MainTabScreen = () => (
//   <Tab.Navigator initialRouteName="Home" activeColor="#fff">
//     <Tab.Screen
//       name="Home"
//       component={HomeScreen}
//       options={{
//         tabBarColor: "#0398fc",
//         tabBarLabel: "Home",
//         tabBarIcon: ({ color }) => <Icon name="home" color={color} size={26} />,
//       }}
//     />
//     <Tab.Screen
//       name="Details"
//       component={DetailScreen}
//       options={{
//         tabBarColor: "#0398fc",
//         tabBarLabel: "Notifications",
//         tabBarIcon: ({ color }) => (
//           <Icon name="notifications" color={color} size={26} />
//         ),
//       }}
//     />
//     <Tab.Screen
//       name="Profile"
//       component={ProfileScreen}
//       options={{
//         tabBarColor: "#0398fc",
//         tabBarLabel: "Profile",
//         tabBarIcon: ({ color }) => (
//           <Icon name="person" color={color} size={26} />
//         ),
//       }}
//     />
//     <Tab.Screen
//       name="Explore"
//       component={ExploreScreen}
//       options={{
//         tabBarColor: "#0398fc",
//         tabBarLabel: "Explore",
//         tabBarIcon: ({ color }) => (
//           <Icon name="aperture" color={color} size={26} />
//         ),
//       }}
//     />
//   </Tab.Navigator>
// );

export default MainTabScreen;

// const HomeStackScreen = () => (
//   <HomeStack.Navigator
//     screenOptions={{
//       headerShown: false,
//     }}
//   >
//     <HomeStack.Screen name="Home" component={HomeScreen} />
//   </HomeStack.Navigator>
// );

// const DetailStackScreen = () => (
//   <DetailStack.Navigator
//     screenOptions={{
//       headerShown: false,
//     }}
//   >
//     <DetailStack.Screen name="Details" component={DetailScreen} />
//   </DetailStack.Navigator>
// );
