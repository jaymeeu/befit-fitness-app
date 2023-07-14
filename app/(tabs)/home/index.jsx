import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Logout } from "../../../utils/Logout";
import { useAuthContext } from "../../../contexts/AuthContext";
import { Pressable, ScrollView, StyleSheet, TouchableOpacity, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";
import { Text, View } from "../../../components/Themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Auth } from "aws-amplify";
import { FontAwesome } from "@expo/vector-icons";
import UpperCard from "../../../components/home/UpperCard";
import Spacebetween from "../../../components/Spacebetween";
import SwiperFlatList from "react-native-swiper-flatlist";
import PlanCard from "../../../components/home/PlanCard";

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
    titled: {
      padding: 15
    },
    plans: { color: '#0C0C0C', fontSize: 18, fontFamily: 'capriola' },
    presable: { color: '#0C0C0C', fontSize: 14, fontFamily: 'capriola' },
  })
  const data = [{
    "title": "MASSIVE UPPER BODY",
    "subtitle": "Select from lists of workout plans for your desired goal Select from lists of workout plans for your desired goal Select from lists of workout plans for your desired goal",
  },
  {
    "title": "Do the exercises",
    "subtitle": "Do the exercise and stay consistence with your workout plans Select from lists of workout plans for your desired goal",
  },
  {
    "title": "Get desired results",
    "subtitle": "Achieve your desired body shape and goals Select from lists of workout plans for your desired goal Select from lists of workout plans for your desired goal",
  }]

  const image = index => ({ each: data[index % data.length] });

  const items = Array.from(Array(3)).map((_, index) => image(index));
  
  const RenderItem = ({ item, index }) => (
    <PlanCard item={item}/>
  )
 
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

        <SwiperFlatList
          // style={{ backgroundColor: 'green' }}
          data={items}
          renderItem={({ item }) => <RenderItem item={item.each} />}
          showPagination
        />
      </View>

    </ScrollView>
  );
};

export default HomeScreen;
