import React from 'react';
import { StyleSheet } from 'react-native';
import { Pagination } from 'react-native-swiper-flatlist';

const styles = StyleSheet.create({
  paginationContainer: {
    bottom: 110,
    alignItems :'center',
    justifyContent:'flex-start',
    paddingHorizontal:30,
    width:'100%'
    // justifyContent :'flex-end'
    
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

export const CustomPagination = (props) => {
  return (
    
    <Pagination
      {...props}
      paginationStyle={styles.paginationContainer}
      paginationStyleItem = {styles.pagination}
      paginationStyleItemActive={styles.active}
      paginationStyleItemInactive={styles.inactive}
      paginationDefaultColor="#E8E8E8"
      paginationActiveColor="#0c0c0c"
    />
  );
};
