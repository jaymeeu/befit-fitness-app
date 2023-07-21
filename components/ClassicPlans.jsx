import { View, Text, StyleSheet, Image, Pressable, ImageBackground } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import classic_bg from '../assets/images/classic_bg.jpg'
import classic_bg1 from '../assets/images/classic_bg1.jpg'
import classic_bg2 from '../assets/images/classic_bg2.jpg'

const ClassicPlans = ({ basic, intermediate, advance }) => {

    const router = useRouter()

    const styles = StyleSheet.create({
        container: {
            backgroundColor: 'transparent',
        },
        heading: {
            padding: 15,
            height: 90,
            justifyContent: 'space-evenly',
            flex: 1
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
            height: 84,
            flexDirection: 'row',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            backgroundColor: '#1f1f1f',
            width: '100%'
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
            fontSize: 14,
            marginBottom: 5
        },
    })
    return (
        <View style={{ gap: 20 }}>

            {
                basic.length > 0 &&
                <View style={styles.container}>
                    <ImageBackground
                        resizeMode="cover"
                        imageStyle={{ borderTopRightRadius: 15, borderTopLeftRadius: 15 }}
                        source={classic_bg} style={styles.heading}>
                        <Text style={styles.workout}>{basic.length} Workouts</Text>
                        <Text style={styles.category}>Beginner</Text>
                    </ImageBackground>
                    {
                        basic.map((res, i) => (
                            <Pressable
                                onPress={() => router.push({
                                    pathname: "/workout",
                                    params: { id: res.id },
                                })}

                                key={res.id} style={styles.card_flex}>
                                <Image source={{ uri: res.image }} style={{ width: 60, height: 60, borderRadius: 15 }} />
                                <View style={[styles.flexer, {borderBottomWidth : (i + 1) === basic.length ? 0 : StyleSheet.hairlineWidth}]}>
                                    <View>
                                        <Text style={styles.workout1}>{res.title.toUpperCase()}</Text>
                                        <Text style={[styles.workout, { color: '#8a8a8a' }]}>{res.exercises.length} Exercises</Text>
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
                    <ImageBackground
                        resizeMode="cover"
                        imageStyle={{ borderTopRightRadius: 15, borderTopLeftRadius: 15 }}
                        source={classic_bg1} style={styles.heading}>
                        <Text style={styles.workout}>{intermediate.length} Workouts</Text>
                        <Text style={styles.category}>Intermediate</Text>
                    </ImageBackground>
                    {
                        intermediate.map((res, i) => (
                            <Pressable key={res.id}
                                onPress={() => router.push({
                                    pathname: "/workout",
                                    params: { id: res.id },
                                })}
                                style={styles.card_flex}>
                                <Image source={{ uri: res.image }} style={{ width: 60, height: 60, borderRadius: 15 }} />
                                <View style={[styles.flexer, {borderBottomWidth : (i + 1) === intermediate.length ? 0 : StyleSheet.hairlineWidth}]}>
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
                    <ImageBackground
                        resizeMode="cover"
                        imageStyle={{ borderTopRightRadius: 15, borderTopLeftRadius: 15 }}
                        source={classic_bg2} style={styles.heading}>
                        <Text style={styles.workout}>{advance.length} Workouts</Text>
                        <Text style={styles.category}>Advanced</Text>
                    </ImageBackground>
                    {
                        advance.map((res, i) => (
                            <Pressable key={res.id}
                                onPress={() => router.push({
                                    pathname: "/workout",
                                    params: { id: res.id },
                                })}
                                style={styles.card_flex}>
                                <Image source={{ uri: res.image }} style={{ width: 60, height: 60, borderRadius: 15 }} />
                                <View style={[styles.flexer, {borderBottomWidth : (i + 1) === advance.length ? 0 : StyleSheet.hairlineWidth}]}>
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