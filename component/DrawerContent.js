import * as React from "react";
import { View, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IonicIcon from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../Context/UserContext";

export function DrawerContent(props) {
  const paperTheme = useTheme();

  const { signOut, toggleTheme } = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            {/* User profile section start */}

            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={require("../assets/profile.png")}
                size={50}
                backgroundColor="#fff"
              />
              <View style={{ marginLeft: 20, flexDirection: "column" }}>
                <Title style={styles.title}>John Doe</Title>
                <Caption style={styles.caption}>@j_doe</Caption>
              </View>
            </View>
            {/* User profile section start */}

            {/* followers section start */}
            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={(styles.paragraph, styles.caption)}>
                  100
                </Paragraph>
                <Caption style={styles.caption}>Following</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={(styles.paragraph, styles.caption)}>
                  100
                </Paragraph>
                <Caption style={styles.caption}>Followers</Caption>
              </View>
            </View>

            {/* followers section end */}
          </View>
          <Drawer.Section style={styles.drawerSection}>
            {/* Home */}
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />

            {/* Detail */}
            <DrawerItem
              icon={({ color, size }) => (
                <IonicIcon name="notifications" color={color} size={size} />
              )}
              label="Notifications"
              onPress={() => {
                props.navigation.navigate("Notifications");
              }}
            />
            {/* Bookmark */}
            <DrawerItem
              icon={({ color, size }) => (
                <IonicIcon name="aperture" color={color} size={size} />
              )}
              label="Explore"
              onPress={() => {
                props.navigation.navigate("Explore");
              }}
            />

            {/* Profile */}
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="cog" color={color} size={size} />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate("Profile");
              }}
            />
            {/* Support */}
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-check-outline" color={color} size={size} />
              )}
              label="Support"
              onPress={() => {
                props.navigation.navigate("Support");
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}
            >
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
