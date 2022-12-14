'use strict';
import { StyleSheet } from 'react-native';
import { withOrientation } from 'react-navigation';

module.exports = StyleSheet.create({
    container: {
      fontFamily: 'Inter-Black',
      fontSize: 10,
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    // light theme --------------
    lightContainer: {
      backgroundColor: '#F7F7F7',
  
    },
    lightThemeText: {
      color: '#242c40',
    },
    // dark theme ----------------
    darkContainer: {
      backgroundColor: '#242c40',
    },
    darkThemeText:{
      color: '#F7F7F7',
    },
    // APP STYLING -------------
    title: {
      fontFamily: 'Inter-Thin',
      fontSize: 40,
      margin: 10,
      marginTop: 40,
      padding:35,
    },
  
    subtitle:{
      fontFamily: 'Inter-Light',
      fontSize: 20, 
      padding:30,  
    },
    // ITEM STYLING ----
    item: {
      backgroundColor: '#000000',
      marginHorizontal: 16,
      marginVertical: 8,
      padding: 10,
    },
  });