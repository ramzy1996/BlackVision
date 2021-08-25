// In App.js in a new project

import React, { useEffect } from "react";
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import MainTabScreen from "./component/MainTabScreen";
import NotificationScreen from "./component/NotificationScreen";
import HomeScreen from "./component/HomeScreen";
import ProfileScreen from "./component/ProfileScreen";
import ExploreScreen from "./component/ExploreScreen";
import { DrawerContent } from "./component/DrawerContent";
import SupportScreen from "./component/SupportScreen";
import SettingsScreen from "./component/SettingsScreen";
import EditProfileScreen from "./component/EditProfileScreen";
import RootStackScreen from "./component/RootStackScreen";
import { View, ActivityIndicator, StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "./Context/UserContext";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkConnected } from "./component/NoInternet";
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from "react-native-paper";
import NoInternetScreen from "./component/NoInternetScreen";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function App() {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const [connectStatus, setConnectStatus] = React.useState(false);

  checkConnected().then((res) => {
    setConnectStatus(res);
  });

  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setuserToken] = React.useState(null);
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: "#ffffff",
      text: "#333333",
    },
  };
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: "#333333",
      text: "#ffffff",
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );
  const authContext = React.useMemo(
    () => ({
      signIn: async (foundUser) => {
        // setuserToken("secret");
        // setIsLoading(false);
        let userToken;
        userToken = String(foundUser[0].userToken);
        userName = foundUser[0].username;

        try {
          await AsyncStorage.setItem("secret", userToken);
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGIN", id: userName, token: userToken });
      },
      signOut: async () => {
        // setuserToken(null);
        // setIsLoading(false);
        try {
          await AsyncStorage.removeItem("secret");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
      signUp: () => {
        // setuserToken("secret");
        // setIsLoading(false);
      },
      toggleTheme: () => {
        setIsDarkTheme((isDarkTheme) => !isDarkTheme);
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("secret");
      } catch (e) {
        console.log(e);
      }
      // setIsLoading(false);
      dispatch({ type: "REGISTER", token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return connectStatus ? (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          <StatusBar backgroundColor="#0398fc" barStyle="light-content" />

          {loginState.userToken !== null ? (
            <Drawer.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerStyle: {
                  backgroundColor: "#0398fc",
                },
                headerTintColor: "#fff",
              }}
              drawerContent={(props) => <DrawerContent {...props} />}
            >
              <Drawer.Screen name="Home" component={HomeScreen} />
              <Drawer.Screen name="Profile" component={ProfileScreen} />
              <Drawer.Screen
                name="Notifications"
                component={NotificationScreen}
              />
              <Drawer.Screen name="Support" component={SupportScreen} />
              <Drawer.Screen name="Explore" component={ExploreScreen} />
              <Drawer.Screen name="Settings" component={SettingsScreen} />
              <Drawer.Screen name="EditProfile" component={EditProfileScreen} />
            </Drawer.Navigator>
          ) : (
            <RootStackScreen />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  ) : (
    <NoInternetScreen />
  );
}

export default App;
