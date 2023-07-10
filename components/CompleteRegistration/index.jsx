import { View, Text, useWindowDimensions, Pressable, StyleSheet } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SwiperFlatList from 'react-native-swiper-flatlist'
import { Paginator } from './Paginator'
import Hello from './Hello'
import { Ionicons } from '@expo/vector-icons';
import Gender from './Gender'
import Fullname from './Fullname'
import Age from './Age'
import Height from './Height'
import Weight from './Weight'
import { useUserContext } from '../../contexts/RegContext'

const Registration = () => {
    const { width, height } = useWindowDimensions();
    const scrollRef = useRef(null);

    const { info } = useUserContext()

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

    // const Submit = ()=>{
    //     console.log(info)
    // }


    const data = [
        <Hello goNext={goToNext} />,
        <Gender goNext={goToNext} />,
        <Fullname goNext={goToNext}/>,
        <Age goNext={goToNext}/>,
        // <Height goNext={goToNext}/>,
        // <Weight goNext={Submit}/>,

    ]
    const image = index => ({ each: data[index % data.length] });

    const items = Array.from(Array(6)).map((_, index) => image(index));

    const RenderItem = ({ item, index }) => (
        <View style={{ width: width, height: height - 250, justifyContent: 'center' }}>
            {item}
        </View>
    )

    const styles = StyleSheet.create({
        navbar: {
            padding: 15,
        }
    })
    return (
        <SafeAreaView>
            <View style={styles.navbar}>
                {
                    currentIndex !== 0 &&
                    <Pressable onPress={goBack}>
                       <Ionicons name="ios-arrow-back-outline" size={30} />

                    </Pressable>
                }
            </View>

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


        </SafeAreaView>
    )
}

export default Registration