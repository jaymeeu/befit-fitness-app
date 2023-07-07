import React, { useState, useRef } from 'react';
import { Dimensions, View, Pressable, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import slide1 from '../../assets/images/slide1.png'
import slide2 from '../../assets/images/slide2.png'
import slide3 from '../../assets/images/slide3.png'
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomPagination } from '../../components/Onboarding/CustomPagination';
import { useAuthContext } from '../../contexts/AuthContext';
import EachBoard from '../../components/Onboarding/EachBoard';
import { SafeAreaView } from 'react-native-safe-area-context';

const Onboarding = () => {

  const { width } = useWindowDimensions();
  const { height } = useWindowDimensions();
  const { setuserOnboard } = useAuthContext()

  const scrollRef = useRef(null);

  const [currentIndex, setcurrentIndex] = useState(0)


  const goToNext = () => {
    setcurrentIndex(prev => prev + 1)
    scrollRef.current.scrollToIndex({ index: currentIndex + 1 });
  };

  const getCurrentIndex = () => {
    setcurrentIndex(scrollRef.current.getCurrentIndex())
  };

  const onChangeIndex = ({ index, prevIndex }) => {
    // console.log({ index, prevIndex });
    setcurrentIndex(index)
  };

  const data = [{
    "imageSrc": slide1,
    "title": "Get verified talents",
    "subtitle": "Discover the best talent to join your team or for your next project",
    "imageDimension": { width: height/4.1, height: height/4.1 }
  },
  {
    "imageSrc": slide2,
    "title": "Get verified talents",
    "subtitle": "Discover the best talent to join your team or for your next project",
    "imageDimension": { width: 180, height: 150 }
  },
  {
    "imageSrc": slide3,
    "title": "Get verified talents",
    "subtitle": "Discover the best talent to join your team or for your next project",
    "imageDimension": { width: 177, height: 125 }
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

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.skip}
        onPress={ async() =>{
          await AsyncStorage.setItem('@user_onboard', 'onboarded');
          setuserOnboard('onboarded')
        } }
      >
        <Text style={styles.nextText}>Skip</Text>
      </TouchableOpacity>

      <SwiperFlatList
        onChangeIndex={onChangeIndex}
        data={items}
        ref={scrollRef}
        renderItem={({ item }) => <RenderItem item={item.each} />}
        showPagination
        PaginationComponent={CustomPagination}
      />

      {
        currentIndex === 2 ?
          <Pressable style={styles.next} 
            onPress={ async() => {
              await AsyncStorage.setItem('@user_onboard', 'onboarded');
              setuserOnboard('onboarded')
            }}
           >
            <Text style={styles.nextText}>Next</Text>
            <AntDesign name="arrowright" size={20} color="black" />
          </Pressable>
          :
          <Pressable style={styles.next} onPress={goToNext} >
            <Text style={styles.nextText}>Next</Text>
            <AntDesign name="arrowright" size={20} color="black" />
          </Pressable>
      }
    </SafeAreaView>
  );
};

export default Onboarding

const styles = StyleSheet.create({
  container : { 
    flex: 1, backgroundColor: "white", paddingVertical: 30 
  },
  next : {
    paddingHorizontal : 30,
    alignItems : 'center',
    flexDirection :'row'
  },
  
  nextText : {
    fontFamily: 'capriola',
    fontSize: 18,
    marginRight : 5
  },
  skip : {
    paddingHorizontal : 30,
    flexDirection :'row',
    justifyContent:'flex-end'
  },
})