import { registerRootComponent } from "expo";
import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const getExpoHost = () => {
  const candidates = [
    Constants.expoConfig?.hostUri,
    Constants.manifest2?.extra?.expoGo?.debuggerHost,
    Constants.manifest?.debuggerHost
  ];

  const hostValue = candidates.find(Boolean) ?? "";
  const host = hostValue.split(":")[0];
  return host || "localhost";
};

const getApiBaseUrl = (port) => {
  const host = getExpoHost();
  return `http://${host}:${port}`;
};

const API_BASE_URL = getApiBaseUrl(4102);
const Stack = createNativeStackNavigator();

function FeedScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/posts`)
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch(() => setPosts([]));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Social Feed</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => navigation.navigate("Details", { post: item })}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.meta}>User ID: {item.user_id}</Text>
            <Text numberOfLines={2} style={styles.body}>{item.body}</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

function DetailsScreen({ route }) {
  const { post } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{post.title}</Text>
        <Text style={styles.meta}>User ID: {post.user_id}</Text>
        <Text style={styles.body}>{post.body}</Text>
      </View>
    </SafeAreaView>
  );
}

function MainApp() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Feed" component={FeedScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eff6ff" },
  title: { fontSize: 28, fontWeight: "700", color: "#1d4ed8", padding: 20 },
  list: { paddingHorizontal: 20, paddingBottom: 20 },
  card: { backgroundColor: "#ffffff", borderRadius: 18, padding: 16, marginBottom: 14 },
  cardTitle: { fontSize: 18, fontWeight: "700", color: "#0f172a" },
  meta: { color: "#475569", marginVertical: 8 },
  body: { color: "#334155", lineHeight: 22 }
});

registerRootComponent(MainApp);

export default MainApp;
