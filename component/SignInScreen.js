import * as React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { AuthContext } from "../Context/UserContext";
import * as Animatable from "react-native-animatable";
import Users from "../model/users";
import { useTheme } from "@react-navigation/native";

function SignInScreen({ navigation }) {
  const { colors } = useTheme();

  const [data, setData] = React.useState({
    username: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const { signIn } = React.useContext(AuthContext);

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePassword = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const togglePasswordIcon = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const loginHandle = (userName, password) => {
    const foundUser = Users.filter((item) => {
      return userName === item.username && password === item.password;
    });
    if (data.username.length == 0 || data.password.length == 0) {
      Alert.alert(
        "Wrong Input!",
        "Username or password field cannot be empty.",
        [{ text: "Okay" }]
      );
      return;
    }
    if (foundUser.length === 0) {
      Alert.alert("Invalid User!", "Username or password is incorrect.", [
        { text: "Okay" },
      ]);
      return;
    }
    signIn(foundUser);
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0398fc" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!!</Text>
      </View>
      <Animatable.View
        animation="zoomIn"
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        {/* email field */}
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
            },
          ]}
        >
          UserName
        </Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Enter Your UserName"
            style={[styles.textInput, { color: colors.text }]}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
          <Animatable.View animation="bounceInRight">
            {data.check_textInputChange ? (
              <Feather name="check-circle" color="green" size={25} />
            ) : null}
          </Animatable.View>
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft">
            <Text style={styles.errorMsg}>
              Username must be 4 characters long
            </Text>
          </Animatable.View>
        )}

        {/* password field */}
        <Text
          style={[styles.text_footer, { color: colors.text, marginTop: 40 }]}
        >
          Password
        </Text>
        <View style={styles.action}>
          <FontAwesome name="lock" color={{ color: colors.text }} size={20} />
          <TextInput
            placeholder="Enter Your Password"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[styles.textInput, { color: colors.text }]}
            autoCapitalize="none"
            onChangeText={(val) => handlePassword(val)}
          />

          <TouchableOpacity onPress={togglePasswordIcon}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="gray" size={20} />
            ) : (
              <Feather name="eye" color="gray" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft">
            <Text style={styles.errorMsg}>
              Password must be 6 characters long
            </Text>
          </Animatable.View>
        )}

        {/* forgot password */}
        <TouchableOpacity onPress={togglePasswordIcon}>
          <Text style={{ color: "#009387", marginTop: 15 }}>
            Forgot Password
          </Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              loginHandle(data.username, data.password);
            }}
          >
            <LinearGradient
              colors={["#03dbfc", "#0398fc"]}
              style={styles.signIn}
            >
              <Text style={[styles.textSign, { color: "#fff" }]}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("SignUpScreen")}
            style={[
              styles.signIn,
              { borderColor: "#0398fc", borderWidth: 1, marginTop: 15 },
            ]}
          >
            <Text style={[styles.textSign, { color: "#0398fc" }]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}
export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0398fc",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
