import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

const Hello = ({ goNext }) => {

    const styles = StyleSheet.create({
        contaiver: {
            paddingHorizontal: 15
        },
        textCont: {
            flexDirection: 'column',
            gap: 10,
            width: '70%'

        },
        heading: {
            fontSize: 30,
            fontWeight: 600
        },
        descr: {
            fontSize: 16,
            fontFamily: "work-san"
        },
        btncontainer: {
            marginTop: 20,
            padding: 20
        },
        btn: {
            padding: 15,
            borderRadius: 25,

        },
        btnText: {
            fontSize: 16,
            color: "white",
            textAlign: 'center',
            fontWeight : 600,
            fontFamily : "capriola"
        }

    })

    return (
        <View style={styles.contaiver}>
            <View style={styles.textCont}>
                <Text style={styles.heading}>👋</Text>
                <Text style={styles.heading}>Hello!</Text>
                <Text style={styles.descr}>I'm your personal coach.</Text>
                <Text style={styles.descr}>Here are some questions to help us tailor a fitness plan for you.</Text>
            </View>
            <View style={styles.btncontainer}>
                <Pressable onPress={goNext}>
                <LinearGradient
                    style={styles.btn}
                    colors={['#194769', '#201f2d', '#5E7E96']}
                    >
                    <Text style={styles.btnText}>LET'S GO</Text>
                </LinearGradient>
                </Pressable>
            </View>

        </View>
    )
}

export default Hello