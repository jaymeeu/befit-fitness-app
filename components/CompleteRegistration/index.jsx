import { View, Text, useWindowDimensions, Pressable } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SwiperFlatList from 'react-native-swiper-flatlist'
import { Paginator } from './Paginator'

const Registration = () => {
    const { width, height } = useWindowDimensions();
    const scrollRef = useRef(null);

  const [currentIndex, setcurrentIndex] = useState(0)


  const goToNext = () => {
    setcurrentIndex(prev => prev + 1)
    scrollRef.current.scrollToIndex({ index: currentIndex + 1 });
  };

  const goBack = () => {
    setcurrentIndex(prev => prev + 1)
    scrollRef.current.scrollToIndex({ index: currentIndex - 1 });
  };

  const onChangeIndex = ({ index, prevIndex }) => {
    // console.log({ index, prevIndex });
    setcurrentIndex(index)
  };


  const data = [{
    "title": "Select workout plan",
  },
  {
    "title": "Do the exercises",
  },
  {
    "title": "Get desired results",
  },
  ]
  const image = index => ({ each: data[index % data.length] });

  const items = Array.from(Array(3)).map((_, index) => image(index));

  const RenderItem = ({ item, index }) => (
    <View style={{ width: width, height : height - 150, justifyContent :'center'}}>
     <Text>{item.title}</Text>
    </View>
  )

  return (
    <SafeAreaView>
      <Text>Onboarding flow</Text>

      <SwiperFlatList
        onChangeIndex={onChangeIndex}
        data={items}
        ref={scrollRef}
        disableGesture={true}
        // autoplay={true}
        // autoplayLoop={true}
        renderItem={({ item }) => <RenderItem item={item.each} />}
        showPagination
        PaginationComponent={Paginator}
      />
 {
        currentIndex === 2 ?
    
      <Pressable onPress={goBack}>
        <Text>Previos</Text>
      </Pressable>
      :
      <Pressable onPress={goToNext}>
        <Text>Next</Text>
      </Pressable>

 }

    </SafeAreaView>
  )
}

export default Registration