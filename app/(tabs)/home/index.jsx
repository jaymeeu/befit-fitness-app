import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet} from "react-native";
import { Text, View } from "../../../components/Themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Auth, DataStore } from "aws-amplify";
import Spacebetween from "../../../components/Spacebetween";
import SwiperFlatList from "react-native-swiper-flatlist";
import PlanCard from "../../../components/home/PlanCard";
import ClassicPlans from "../../../components/ClassicPlans";
import { Workout } from "../../../src/models";

const HomeScreen = () => {

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
    titled: {
      padding: 15,
      paddingBottom : 0
    },
    plans: { color: '#0C0C0C', fontSize: 20, fontFamily: 'capriola' },
    presable: { color: '#0C0C0C', fontSize: 14, fontFamily: 'capriola' },
  })

  const image = index => ({ each: special[index % special.length] });

  const items = Array.from(Array(special.length)).map((_, index) => image(index));
  
  const RenderItem = ({ item, index }) => (
    <PlanCard item={item}/>
  )
 
  return (
    <ScrollView >
      <View>
        <View style={styles.titled}>
          <Spacebetween>
            <Text style={styles.plans}>Top Plans</Text>
          </Spacebetween>
        </View>

        <SwiperFlatList
          data={items}
          autoplay={true}
          autoplayLoop={true}
          autoplayDelay={5}
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
