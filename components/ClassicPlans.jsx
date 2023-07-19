import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const ClassicPlans = ({basic,intermediate,advance}) => {

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
            display : 'flex',
            alignItems: 'center',
            gap: 10,
            backgroundColor: '#292929',
            width : '100%'
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
            marginBottom: 5
        },
    })
    return (
        <View style={{ gap: 20 }}>

            {
                basic.length > 0 &&
                <View style={styles.container}>
                    <View style={styles.heading}>
                        <Text style={styles.workout}>{basic.length} Workouts</Text>
                        <Text style={styles.category}>Beginner</Text>
                    </View>
                    {
                        basic.map((res) => (
                            <Pressable 
                                onPress={() => router.push({
                                    pathname: "/workout",
                                    params: { id : res.id },
                                })} 
                                
                                key={res.id} style={styles.card_flex}>
                                <Image source={{ uri: res.image }} style={{ width: 70, height: 70, borderRadius: 15 }} />
                                <View style={styles.flexer}>
                                    <View>
                                        <Text style={styles.workout1}>{res.title.toUpperCase()}</Text>
                                        <Text style={[styles.workout, { color: '#707070' }]}>{res.exercises.length} Exercises</Text>
                                    </View>
                                    <Ionicons name="arrow-forward-circle" size={24} color='#707070' />
                                </View>
                            </Pressable>
                        ))
                    }
                </View>
            }

            {
                intermediate.length > 0 &&
                <View style={styles.container}>
                    <View style={styles.heading}>
                        <Text style={styles.workout}>{intermediate.length} Workouts</Text>
                        <Text style={styles.category}>Intermediate</Text>
                    </View>
                    {
                        intermediate.map((res) => (
                            <Pressable key={res.id} 
                                onPress={() => router.push({
                                    pathname: "/workout",
                                    params: { id: res.id },
                                })} 
                                style={styles.card_flex}>
                                <Image source={{ uri: res.image }} style={{ width: 70, height: 70, borderRadius: 15 }} />
                                <View style={styles.flexer}>
                                    <View>
                                        <Text style={styles.workout1}>{res.title.toUpperCase()}</Text>
                                        <Text style={[styles.workout, { color: '#707070' }]}>{res.exercises.length} Exercises</Text>
                                    </View>
                                    <Ionicons name="arrow-forward-circle" size={24} color='#707070' />
                                </View>
                            </Pressable>
                        ))
                    }
                </View>
            }

            {
                advance.length > 0 &&
                <View style={styles.container}>
                    <View style={styles.heading}>
                        <Text style={styles.workout}>{advance.length} Workouts</Text>
                        <Text style={styles.category}>Advanced</Text>
                    </View>
                    {
                        advance.map((res) => (
                            <Pressable key={res.id} 
                                onPress={() => router.push({
                                    pathname: "/workout",
                                    params: { id: res.id },
                                })} 
                                style={styles.card_flex}>
                                <Image source={{ uri: res.image }} style={{ width: 70, height: 70, borderRadius: 15 }} />
                                <View style={styles.flexer}>
                                    <View>
                                        <Text style={styles.workout1}>{res.title.toUpperCase()}</Text>
                                        <Text style={[styles.workout, { color: '#707070' }]}>{res.exercises.length} Exercises</Text>
                                    </View>
                                    <Ionicons name="arrow-forward-circle" size={24} color='#707070' />
                                </View>
                            </Pressable>
                        ))
                    }
                </View>
            }


        </View>
    )
}

export default ClassicPlans