import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Logout } from "../../../utils/Logout";
import { useAuthContext } from "../../../contexts/AuthContext";
import { Pressable, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Text, View } from "../../../components/Themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Auth } from "aws-amplify";
import { FontAwesome } from "@expo/vector-icons";
import UpperCard from "../../../components/home/UpperCard";
import Spacebetween from "../../../components/Spacebetween";

const HomeScreen = () => {
  const { setDbUser } = useAuthContext()

  const router = useRouter()

  // useEffect(() => {
  //    AsyncStorage.removeItem('@user_onboard')
  //     AsyncStorage.removeItem('@db_user')
  //     Auth.signOut()
  // }, [])

  const styles = StyleSheet.create({
    upperCardCont: {
      padding: 15,
      flexDirection: "row",
      gap: 10,
      backgroundColor: 'red',
    },
    titled : {
      padding : 15
    },
    plans : { color: '#0C0C0C', fontSize: 18, fontFamily: 'capriola' },
    presable : { color: '#0C0C0C', fontSize: 14, fontFamily: 'capriola' }

  })

  return (
    <ScrollView >
      <View style={styles.upperCardCont}>
        <UpperCard
          count={"21"}
          subtitle={"Day streak"}
          tagNum={"Best streak : 0"}
          icon={<FontAwesome size={28} name="code" />}
        />
        <UpperCard
          count={"21"}
          subtitle={"Day streak"}
          tagNum={"Best streak : 0"}
          icon={<FontAwesome size={28} name="code" />}
        />
      </View>

      <View>
        <View style={styles.titled}>
        <Spacebetween>
          <Text style={styles.plans}>Plans</Text>
          <TouchableOpacity onPress={() => console.log('hello')}>
            <Text style={styles.presable}>See all</Text>
          </TouchableOpacity>
        </Spacebetween>
        </View>
       
      </View>

    </ScrollView>
  );
};

export default HomeScreen;
