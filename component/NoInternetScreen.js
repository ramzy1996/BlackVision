import * as React from "react";
import {
  View,
  Text,
  Image,
  Button,
  RefreshControl,
  SafeAreaView,
  ScrollView,
} from "react-native";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function NoInternetScreen(props) {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Image
          source={require("../assets/No-Connection.png")}
          style={{ width: "30%", height: "30%" }}
          resizeMode="contain"
        />
        <Text>Pull down Reload the page!!</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
export default NoInternetScreen;
