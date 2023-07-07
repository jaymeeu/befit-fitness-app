import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import React from 'react'

const EachBoard = (props) => {
    const {imageSrc, title, subtitle, imageDimension} = props
    return (
        <View style={style.container}>
            <Image
                style={[style.images, imageDimension, {maxHeight : 220 , maxWidth : 220}]}
                source={imageSrc}
            />
            <Text style={[style.heading]}>{title}</Text>
            <Text style={[style.subheading]}>{subtitle}</Text>
        </View>
    )
}

export default EachBoard
const window_width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const style = StyleSheet.create({
    container: {
        width: window_width,
        padding: 30
    },
    images: {
        marginVertical : height / 53,
    },
    heading: {
        marginBottom: 12,
    },
    subheading: {
        width: window_width * 0.8,
    }
})