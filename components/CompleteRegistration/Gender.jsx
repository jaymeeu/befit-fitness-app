import { View, Text, Pressable, StyleSheet, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constants/Colors';
import { useUserContext } from '../../contexts/RegContext';

const Gender = ({ goNext }) => {

    const { info, updateState } = useUserContext()

    const colorScheme = useColorScheme()
    const styles = StyleSheet.create({
        contaiver: {
            paddingHorizontal: 15,
            paddingVertical: 40,
            height: '100%',
            justifyContent: 'space-between'
        },
        textCont: {
            flexDirection: 'column',
            gap: 10,

        },
        heading: {
            fontSize: 26,
            fontFamily: "capriola",
            fontWeight: 600,
            textAlign : 'center'
        },
        descr: {
            fontSize: 13,
            fontFamily: "work-san",
            textAlign : 'center'
        },
        btncontainer: {
            marginTop: 20,
            padding: 20
        },
        btn: {
            backgroundColor: '#d4d4d4',
            padding: 15,
            borderRadius: 25,

        },

        btnText: {
            fontSize: 16,
            color: "white",
            textAlign: 'center'
        },
        genders: {
            flexDirection: 'row',
            justifyContent: "space-evenly"
        },
        gender: {
            fontSize: 80
        },
        box: {
            padding: 15,
            borderWidth: 1,
            borderColor: '#d4d4d4',
            borderRadius: 15
        },
        boxActive: {
            padding: 15,
            borderWidth: 1,
            borderColor: '#d4d4d4',
            borderRadius: 15,
            backgroundColor: '#d4d4d4'
        },

        boxlabel: {
            marginTop: 12,
            fontSize: 20,
            fontWeight: 600,
            textAlign: 'center',
            fontFamily: 'capriola',
            color: Colors[colorScheme ?? 'light'].text,

        }
    })

    return (
        <View style={styles.contaiver}>
            <View style={styles.textCont}>
                <Text style={styles.heading}>What's your gender?</Text>
                <Text style={styles.descr}>Knowing your gender can help us tailor the intensity based on different metabolic rate</Text>
            </View>

            <View style={styles.genders}>
                <Pressable onPress={() => updateState('gender', 'male')}>
                    <View style={info.gender === 'male' ? styles.boxActive : styles.box}>
                        <Text style={styles.gender}>👨</Text>
                    </View>
                    <Text style={styles.boxlabel}>Male</Text>
                </Pressable>
                <Pressable onPress={() => updateState('gender', 'female')}>
                    <View style={info.gender === 'female' ? styles.boxActive : styles.box}>
                        <Text style={styles.gender}>👩‍🦰</Text>
                    </View>
                    <Text style={styles.boxlabel}>Female</Text>

                </Pressable>
            </View>

            <View style={styles.btncontainer}>
                {
                    info.gender === '' ?
                        <View
                            style={styles.btn}>
                            <Text style={styles.btnText}>LET'S GO</Text>
                        </View>
                        :
                        <Pressable onPress={goNext}>
                            <LinearGradient
                                style={styles.btn}
                                colors={['#194769', '#201f2d', '#5E7E96']}>
                                <Text style={styles.btnText}>LET'S GO</Text>
                            </LinearGradient>
                        </Pressable>
                }

            </View>

        </View>
    )
}

export default Gender