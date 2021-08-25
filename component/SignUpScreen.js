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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

import * as Animatable from "react-native-animatable";

function SignUpScreen({ navigation }) {
  const [data, setData] = React.useState({
    email: "",
    password: "",
    confirm_Password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });

  const textInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
      });
    }
  };
  const handlePassword = (val) => {
    setData({
      ...data,
      password: val,
    });
  };
  const handleConfirmPassword = (val) => {
    setData({
      ...data,
      confirm_Password: val,
    });
  };
  const togglePasswordIcon = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const toggleConfirmPasswordIcon = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0398fc" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Here</Text>
      </View>
      <Animatable.View animation="zoomIn" style={styles.footer}>
        {/* email field */}
        <Text style={styles.text_footer}>UserName</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Enter Your UserName"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
          />
          <Animatable.View animation="bounceInRight">
            {data.check_textInputChange ? (
              <Feather name="check-circle" color="green" size={25} />
            ) : null}
          </Animatable.View>
        </View>
        {/* password field */}
        <Text style={[styles.text_footer, { marginTop: 40 }]}>Password</Text>
        <View style={styles.action}>
          <FontAwesome name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="Enter Your Password"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
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
        {/* confirm password */}
        <Text style={[styles.text_footer, { marginTop: 40 }]}>
          Confirm Password
        </Text>
        <View style={styles.action}>
          <FontAwesome name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="Enter Your Password Again"
            secureTextEntry={data.confirm_secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handleConfirmPassword(val)}
          />
          <TouchableOpacity onPress={toggleConfirmPasswordIcon}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="gray" size={20} />
            ) : (
              <Feather name="eye" color="gray" size={20} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.button}>
          <LinearGradient colors={["#03dbfc", "#0398fc"]} style={styles.signIn}>
            <Text style={[styles.textSign, { color: "#fff" }]}>Sign Up</Text>
          </LinearGradient>

          <TouchableOpacity
            onPress={() => navigation.navigate("SignInScreen")}
            style={[
              styles.signIn,
              { borderColor: "#0398fc", borderWidth: 1, marginTop: 15 },
            ]}
          >
            <Text style={[styles.textSign, { color: "#0398fc" }]}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}
export default SignUpScreen;

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
