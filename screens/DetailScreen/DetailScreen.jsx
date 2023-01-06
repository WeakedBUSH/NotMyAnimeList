import React, { useCallback, useEffect, useState } from 'react';
import { Button, Text,FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView, } from 'react-navigation';
import {Image} from 'react-native' ; 
const DetailScreen = (route) => {

      const { itemId } = route.params;
      return (
        <SafeAreaView>
        <View>
          <Image style={tw`rounded-3xl w-[150px] h-[250px]`} source={{ uri: `${item.coverImage.extraLarge}` }}/>
        <Text style={tw`text-sm font-medium text-white`}>{item.title.english}</Text>  
        <Text style={tw`text-xs text-gray-500`}>{item.title.native}</Text> 
        <Text style={tw`text-xs text-gray-500`}>{item.seasonYear} - Episodes : {item.episodes}</Text> 
        </View>
        </SafeAreaView>
      );
    
}


export default DetailScreen
