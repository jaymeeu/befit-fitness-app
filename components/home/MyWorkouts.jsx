import { FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Camelize } from '../../utils/Camelize';

const MyWorkouts = ({workouts, progress}) => {

    const Item = ({ item }) => (
        <View style={{flex : 1}}>
        <ImageBackground
            imageStyle={{ borderRadius: 10 }}

         source={{uri : item?.image}} style={styles.item}>
        </ImageBackground>

        <Text style={styles.title}>{Camelize(item?.title)}</Text>
        <Text style={styles.level}>{Camelize(item?.level)}</Text>

        </View>
    );

    return (
        <FlatList
            numColumns={2}
            data={workouts}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={item => item.id}
            columnWrapperStyle={{ gap: 12 }}
        />
    )
}

export default MyWorkouts

const styles = StyleSheet.create({
    item: {
        padding: 10,
        flex: 1,
        marginVertical: 6,
        height:120
    },
    title: {
        fontSize: 16,
        fontWeight : 600,
        fontFamily : 'capriola'
    },
    level: {
        fontSize: 14,
        fontWeight : 600,
        fontFamily : 'work-san'
    },
})