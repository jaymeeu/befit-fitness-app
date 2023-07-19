import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Logout } from "../../../utils/Logout";
import { useAuthContext } from "../../../contexts/AuthContext";
import { Pressable, ScrollView, StyleSheet, TouchableOpacity, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";
import { Text, View } from "../../../components/Themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Auth, DataStore } from "aws-amplify";
import { FontAwesome } from "@expo/vector-icons";
import UpperCard from "../../../components/home/UpperCard";
import Spacebetween from "../../../components/Spacebetween";
import SwiperFlatList from "react-native-swiper-flatlist";
import PlanCard from "../../../components/home/PlanCard";
import ClassicPlans from "../../../components/ClassicPlans";
import { Workout } from "../../../src/models";

const HomeScreen = () => {
  const { setDbUser } = useAuthContext()

  const router = useRouter()

  // useEffect(() => {
  //    AsyncStorage.removeItem('@user_onboard')
  //     AsyncStorage.removeItem('@db_user')
  //     Auth.signOut()
  //     DataStore.clear()
  // }, [])


  const [basic, setBasic] = useState([]);
  const [special, setSpecial] = useState([]);
  const [intermediate, setIntermediate] = useState([]);
  const [advance, setAdvance] = useState([]);

  const fetchall = async () => {
      try {
          const workouts = await DataStore.query(Workout);

          console.log(workouts[0].isPro , "workouts.filter((res) => (res.isPro || res.isSpecial) )")
          setSpecial(workouts.filter((res) => (res.isPro || res.isSpecial) ))
          setBasic(workouts.filter((res) => (res.level === 'BASIC' && !res.isPro && !res.isSpecial) ))
          setIntermediate(workouts.filter((res) => (res.level === 'INTERMEDIATE' && !res.isPro && !res.isSpecial)))
          setAdvance(workouts.filter((res) => (res.level === 'ADVANCED' && !res.isPro && !res.isSpecial)))


      } catch (error) {
          console.log(error, "eoorr");
      }
  };

  useEffect(() => {
      fetchall();
  }, []);

  const styles = StyleSheet.create({
    upperCardCont: {
      padding: 15,
      flexDirection: "row",
      gap: 10,
      backgroundColor: 'red',
    },
    titled: {
      padding: 15,
      paddingBottom : 0
    },
    plans: { color: '#0C0C0C', fontSize: 20, fontFamily: 'capriola' },
    presable: { color: '#0C0C0C', fontSize: 14, fontFamily: 'capriola' },
  })
  const data = [{
    "title": "MASSIVE UPPER BODY",
    "description": "Select from lists of workout plans for your desired goal Select from lists of workout plans for your desired goal Select from lists of workout plans for your desired goal",
  },
  {
    "title": "Do the exercises",
    "description": "Do the exercise and stay consistence with your workout plans Select from lists of workout plans for your desired goal",
  },
  {
    "title": "Get desired results",
    "description": "Achieve your desired body shape and goals Select from lists of workout plans for your desired goal Select from lists of workout plans for your desired goal",
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
          data={items}
          renderItem={({ item }) => <RenderItem item={item.each} />}
          showPagination
        />
      </View>

      <View >
        <View style={styles.titled}>
          <Spacebetween>
            <Text style={styles.plans}>Classic Workouts</Text>
          </Spacebetween>
        </View>
        <View style={{padding : 15}}>
          <ClassicPlans basic={basic} intermediate={intermediate} advance={advance}/>
        </View>
      </View>

    </ScrollView>
  );
};

export default HomeScreen;
