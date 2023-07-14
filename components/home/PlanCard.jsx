import { View, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native'
import React from 'react'

const PlanCard = ({ item }) => {
    const { height, width } = useWindowDimensions();

    const styles = StyleSheet.create({
        swiper: {
            padding: 20, width: width - 30, margin: 15, height: width - 30, borderRadius: 30, backgroundColor: 'gray',
            justifyContent: 'space-between'
        },
        text_text: {
            color: 'white',
            fontFamily: 'work-san',
            fontSize: 18
        },
        text_text2: {
            color: 'white',
            fontFamily: 'work-san-bold',
            fontSize: 36,
            width: '70%'
        },
        text_text3: {
            color: 'white',
            fontFamily: 'work-san',
            fontSize: 16,
        },
        btn: {
            width: '90%',
            backgroundColor: 'white',
            borderRadius: '30px',
            padding: 15
        },
        btnText: {
            color: 'blue',
            fontFamily: 'work-san-bold',
            textAlign: 'center',
            fontSize: 16,
        }

    })




    return (
        <View style={styles.swiper}>
            <Text style={styles.text_text}>{item.title}</Text>
            <Text style={styles.text_text2}>{item.title}</Text>
            <View style={{ gap: 12, backgroundColor: 'transparent', alignItems: 'center' }}>
                <Text style={styles.text_text3} numberOfLines={3}>{item.subtitle}</Text>
                <Pressable style={styles.btn}>
                    <Text style={styles.btnText} >START</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default PlanCard