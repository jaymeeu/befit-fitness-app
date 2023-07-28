import { View, Text, StyleSheet, Pressable, useWindowDimensions, ImageBackground } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { TextStroke } from '../TextStroke';
import { Analytics } from 'aws-amplify';
import { useAuthContext } from '../../contexts/AuthContext';

const PlanCard = ({ item }) => {
    const { height, width } = useWindowDimensions();

    const router = useRouter()

    const { dbUser } = useAuthContext()

    const styles = StyleSheet.create({
        swiper: {
            padding: 20, width: width - 30, margin: 15, height: width - 30,
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
            fontSize: 34,
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

    const onStartClick = ()=>{
        router.push({
            pathname: "/workout",
            params: { id: item.id },
        });

        // Analytics.record({
        //     name: 'workoutClick',
        //     attributes: { 
        //         userid: dbUser.id,
        //         userEmail: dbUser.email, 
        //         workoutName: item.title, 
        //         workoutId: item.id
        //     }
        //   })
          
    }


    return (
        <ImageBackground
            imageStyle={{ borderRadius: 30 }}
            source={{ uri: item.image }} style={styles.swiper}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.text_text}>{item.title?.toUpperCase()}</Text>
                {
                    item.isPro &&
                    <View style={{backgroundColor : 'white', paddingVertical:3, paddingHorizontal : 8, borderRadius :5}}>
                        <Text style={{color:'black', fontWeight : 'bold'}}>Pro</Text>
                    </View>
                }
            </View>
            <TextStroke stroke={1} color={"#000000"}>

                <Text style={styles.text_text2}>{item.title?.toUpperCase()}</Text>
            </TextStroke>
            <View style={{ gap: 12, backgroundColor: 'transparent', alignItems: 'center' }}>
                <Text style={styles.text_text3} numberOfLines={3}>{item.description}</Text>
                <Pressable
                    onPress={() => {
                        item.isPro ?
                        console.log('is pro')
                        :
                        onStartClick()
                        }
                    }
                    style={styles.btn}>
                    <Text style={styles.btnText} >START</Text>
                </Pressable>
            </View>
        </ImageBackground>
    )
}

export default PlanCard