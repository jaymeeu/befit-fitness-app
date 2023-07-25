import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { Pagination } from 'react-native-swiper-flatlist';
import Colors from '../../constants/Colors';



export const Paginator = (props) => {

  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    paginationContainer: {
    //   bottom: 110,
      alignItems :'center',
      paddingHorizontal:30,
      width:'100%',
      justifyContent :'flex-end'
      
    },
    pagination: {
      height :7,
      borderRadius: 10,
      marginHorizontal : 3
      
    },
    active: {
      width: 22,
    },
    inactive: {
      width: 15,
    },
  });

  return (
    
    <Pagination
      {...props}
      paginationStyle={styles.paginationContainer}
      paginationStyleItem = {styles.pagination}
      paginationStyleItemActive={styles.active}
      paginationStyleItemInactive={styles.inactive}
      paginationTapDisabled={true}
      paginationDefaultColor= {Colors[colorScheme ?? "light"].alwayWhite}
      paginationActiveColor= {Colors[colorScheme ?? "light"].tabIconDefault}
    />
  );
};
