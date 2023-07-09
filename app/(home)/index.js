import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "../../components/Themed";
import { Logout } from "../../utils/Logout";
import { useAuthContext } from "../../contexts/AuthContext";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";

const HomeScreen = () => {
    const { setDbUser } = useAuthContext()

const router = useRouter()


  return (
    <SafeAreaView >
      <View>
        <Text>Home page</Text>
      </View>
      <Pressable
        style={{ marginTop: "auto" }}
        onPress={async () => {
          Logout().then(() => {
            setDbUser(null);
            router.replace('/')
          });
        }}
      >
        <Text>Clear storagesf</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default HomeScreen;
