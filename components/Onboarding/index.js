import React, { useState, useRef } from 'react';
import { Dimensions, View, Pressable, Text, StyleSheet, TouchableOpacity, useWindowDimensions, useColorScheme, ImageBackground } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import slide1 from '../../assets/images/slide1.png'
import slide2 from '../../assets/images/slide2.png'
import background from '../../assets/images/background.jpg'
import slide3 from '../../assets/images/slide3.png'
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomPagination } from '../../components/Onboarding/CustomPagination';
import { useAuthContext } from '../../contexts/AuthContext';
import EachBoard from '../../components/Onboarding/EachBoard';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';

const Onboarding = () => {
  const colorScheme = useColorScheme();

  const { width } = useWindowDimensions();
  const { height } = useWindowDimensions();
  const { setuserOnboard } = useAuthContext()
  const router = useRouter()

  const scrollRef = useRef(null);

  const [currentIndex, setcurrentIndex] = useState(0)


  const goToNext = () => {
    setcurrentIndex(prev => prev + 1)
    scrollRef.current.scrollToIndex({ index: currentIndex + 1 });
  };

  const onChangeIndex = ({ index, prevIndex }) => {
    // console.log({ index, prevIndex });
    setcurrentIndex(index)
  };

  const data = [{
    "imageSrc": slide1,
    "title": "Select workout plan",
    "subtitle": "Select from lists of workout plans for your desired goal",
    "imageDimension": { width: '100%', height: 250 }
  },
  {
    "imageSrc": slide2,
    "title": "Do the exercises",
    "subtitle": "Do the exercise and stay consistence with your workout plans ",
    "imageDimension": { width: "100%", height: 250 }
  },
  {
    "imageSrc": slide3,
    "title": "Get desired results",
    "subtitle": "Achieve your desired body shape and goals",
    "imageDimension": { width: "100%", height: 250 }
  },
  ]
  const image = index => ({ each: data[index % data.length] });

  const items = Array.from(Array(3)).map((_, index) => image(index));

  const RenderItem = ({ item, index }) => (
    <View style={{ width: width }}>
      <EachBoard
        imageSrc={item.imageSrc}
        title={item.title}
        subtitle={item.subtitle}
        imageDimension={item.imageDimension}
      />
    </View>
  )



const styles = StyleSheet.create({
  container : { 
    flex: 1, 
    backgroundColor: "transparent", 
    paddingVertical: 30 ,
  },
  backgroud : {
    height : height
    
  },
  next : {
    paddingHorizontal : 30,
    alignItems : 'center',
    flexDirection :'row',
    justifyContent:'flex-end',

  },
  
  nextText : {
    fontFamily: 'capriola',
    fontSize: 18,
    marginRight : 5,
    color : Colors[colorScheme ?? "light"].alwayWhite
  },
  skip : {
    paddingHorizontal : 30,
    flexDirection :'row',
    justifyContent:'flex-end',
    // backgroundColor : 'white'
  },
})


const SkillPress = async () =>{
  await AsyncStorage.setItem('@user_onboard', 'onboarded');
  setuserOnboard('onboarded');
  router.replace('/auth')
}

  return (
    <ImageBackground source={background} style={styles.backgroud}>

    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.skip}
        onPress={SkillPress}
      >
        <Text style={styles.nextText}>Skip</Text>
      </TouchableOpacity>

      <SwiperFlatList
        onChangeIndex={onChangeIndex}
        data={items}
        ref={scrollRef}
        autoplay={true}
        autoplayLoop={true}
        renderItem={({ item }) => <RenderItem item={item.each} />}
        showPagination
        PaginationComponent={CustomPagination}
      />

      {
        currentIndex === 2 ?
          <Pressable style={styles.next} 
            onPress={SkillPress}
           >
            <Text style={styles.nextText}>Next</Text>
            <AntDesign name="arrowright" size={20} color={Colors[colorScheme ?? 'light'].alwayWhite} />
          </Pressable>
          :
          <Pressable style={styles.next} onPress={goToNext} >
            <Text style={styles.nextText}>Next</Text>
            <AntDesign name="arrowright" size={20} color={Colors[colorScheme ?? "light"].alwayWhite} />
          </Pressable>
      }
    </SafeAreaView>
    </ImageBackground>
  );
};


export default Onboarding

