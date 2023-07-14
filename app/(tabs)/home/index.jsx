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

const HomeScreen = () => {
  const { setDbUser } = useAuthContext()

  const router = useRouter()

  // useEffect(() => {
  //    AsyncStorage.removeItem('@user_onboard')
  //     AsyncStorage.removeItem('@db_user')
  //     Auth.signOut()
  // }, [])

  const { height, width } = useWindowDimensions();

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
    swiper : {
      padding: 20, width: width - 30, margin: 15, height: width - 30, borderRadius: 30, backgroundColor: 'gray',
      justifyContent: 'space-between'
    },
    text_text :{
      color : 'white',
      fontFamily : 'work-san',
      fontSize : 18
    },
    text_text2 :{
      color : 'white',
      fontFamily : 'work-san-bold',
      fontSize : 36,
      width : '70%'
    },
    text_text3 :{
      color : 'white',
      fontFamily : 'work-san',
      fontSize : 16,
    },
    btn : { 
      width : '90%',
      backgroundColor :'white',
      borderRadius : '30px',
      padding : 15
    },
    btnText : {
      color : 'blue',
      fontFamily : 'work-san-bold',
      textAlign : 'center',
      fontSize : 16,
    }

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
  },
  ]
  const image = index => ({ each: data[index % data.length] });

  const items = Array.from(Array(3)).map((_, index) => image(index));

  const RenderItem = ({ item, index }) => (
    <View style={styles.swiper}>
      <Text  style={styles.text_text}>{item.title}</Text>
      <Text style={styles.text_text2}>{item.title}</Text>
      <View style={{gap : 12, backgroundColor:'transparent', alignItems : 'center'}}>
        <Text style={styles.text_text3} numberOfLines={3}>{item.subtitle}</Text>
        <Pressable style={styles.btn}>
          <Text style={styles.btnText} >START</Text>
        </Pressable>
      </View>
    </View>
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
          style={{ backgroundColor: 'green' }}
          data={items}
          renderItem={({ item }) => <RenderItem item={item.each} />}
          showPagination
        />



      </View>

    </ScrollView>
  );
};

export default HomeScreen;
