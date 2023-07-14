import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import pushup from '../assets/images/pushup.jpeg'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const ClassicPlans = () => {

    const router = useRouter()

    const styles = StyleSheet.create({
        container: {
            backgroundColor: 'transparent',
        },
        heading: {
            padding: 15,
            height: 110,
            width: '100%',
            backgroundColor: 'red',
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            justifyContent: 'space-evenly'
        },
        workout: {
            fontFamily: 'work-san',
            color: 'white',
            fontSize: 16
        },
      
        category: {
            fontFamily: 'capriola',
            color: 'white',
            fontSize: 20
        },
        card_flex: {
            paddingHorizontal: 15,
            // paddingBottom : 8,
            height: 92,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            backgroundColor : '#292929'
        },
        flexer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomColor: '#707070',
            borderBottomWidth: StyleSheet.hairlineWidth,
            height: '100%'
        },
        workout1: {
            fontFamily: 'capriola',
            color: 'white',
            fontSize: 18,
            marginBottom : 5
        },


    })
    return (
        <View style={styles.container}>
            <View style={styles.heading}>
                <Text style={styles.workout}>5 Workouts</Text>
                <Text style={styles.category}>Beginner</Text>
            </View>

            <Pressable onPress={()=>router.push('/workout/12345')} style={styles.card_flex}>
                <Image source={pushup} style={{ width: 70, height: 70, borderRadius: 15 }} />
                <View style={styles.flexer}>
                    <View>
                        <Text style={styles.workout1}>Abs - Beginner</Text>
                        <Text style={[styles.workout, {color : '#707070'}]}>5 Workouts</Text>
                    </View>
                    <Ionicons name="arrow-forward-circle" size={24} color='#707070' />
                </View>
            </Pressable>
            <View style={styles.card_flex}>
                <Image source={pushup} style={{ width: 70, height: 70, borderRadius: 15 }} />
                <View style={styles.flexer}>
                    <View>
                        <Text style={styles.workout1}>Abs - Beginner</Text>
                        <Text style={[styles.workout, {color : '#707070'}]}>5 Workouts</Text>
                    </View>
                    <Ionicons name="arrow-forward-circle" size={24} color='#707070' />
                </View>
            </View>

        </View>
    )
}

export default ClassicPlans