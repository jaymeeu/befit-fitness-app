import { View, Text, Pressable, StyleSheet, useColorScheme, TextInput } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constants/Colors';
import { useUserContext } from '../../contexts/RegContext';

const Age = ({ goNext }) => {

    const { info, updateState } = useUserContext()

const [age, setage] = useState(info.age)
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
            fontSize: 22,
            fontFamily: "capriola",
            fontWeight: 'bold', 
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
            justifyContent:"center"
        },
        inpute: {
            padding: 15,
            fontSize : 28,
            fontFamily : 'capriola',
            borderBottomColor : "#e4e4e4",
            borderBottomWidth : 1
        }
    })

    return (
        <View style={styles.contaiver}>
            <View style={styles.textCont}>
                <Text style={styles.heading}> Hey {info.fullname.split(" ")[0] }, how old are you?</Text>
                <Text style={styles.descr}>It will help us to adjust the workout to suit your age group</Text>

            </View>

            <View style={styles.genders}>
              <TextInput
              style={styles.inpute}
                value={age}
                onChangeText={(text)=>setage(text)}
                keyboardType='numeric'
                placeholder='Age'
              />
            </View>

            <View style={styles.btncontainer}>
                {
                    age.length <= 1 || age.length > 2 ?
                        <View
                            style={styles.btn}>
                            <Text style={styles.btnText}>LET'S GO</Text>
                        </View>
                        :
                        <Pressable onPress={()=>{
                            updateState('age', age);
                            goNext()
                        }}>
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

export default Age