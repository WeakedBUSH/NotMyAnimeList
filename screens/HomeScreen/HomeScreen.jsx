import React, { useCallback, useEffect, useState, Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Text,FlatList, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView,ScrollView } from 'react-navigation';
import {Image} from 'react-native' ; 
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchBar from '../../components/SearchBar';
import { getPopularAnime } from '../../api/api';
import { Ionicons } from '@expo/vector-icons';


const HomeScreen = () => {
    const [data, setData] = useState([]);  
    const [favorites, setFavorites] = useState({});

    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState('');
    
    const Stack = createNativeStackNavigator();
    const loadFavorites = useCallback(async () => {
      try {
          const storedFavorites = await AsyncStorage.getItem('favorites');
          if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
          }
      } catch (error) {
          console.log(error);
        }
      }, []);

   
       useEffect(() => {
        getPopularAnime(setData);
        loadFavorites();
        if (searchText === '') {
          setFilteredData([]);
        } else {
          const filtered = data.filter((item) => {
            return item.title.english.toLowerCase().includes(searchText.toLowerCase());
          });
          setFilteredData(filtered);
        }
        }, [searchText, loadFavorites]);

        const toggleFavorite = async (id) => {
          try {
            let updatedFavorites = { ...favorites };
            if (updatedFavorites[id]) {
              delete updatedFavorites[id];
            } else {
              updatedFavorites[id] = true;
            }
            setFavorites(updatedFavorites);
            await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
          } catch (error) {
            console.log(error);
          }
        };

      const renderItem = (item) => (
        <TouchableOpacity onPress={() => navigation.navigate('Details',{item})}>
        <View className="w-[150px] h-auto items-center m-5">
        <TouchableOpacity onPress={() => toggleFavorite(item.id)} className="bg-black opacity-75 absolute z-20 w-[auto] h-[auto] p-1 m-2 rounded-lg  ">
          <Ionicons name={favorites[item.id] ? 'heart' : 'heart-outline' } size={24} color={favorites[item.id] ? 'red' : 'gray'} />
        </TouchableOpacity>
        <Image className="rounded-3xl w-[150px] h-[250px]" source={{ uri: `${item.coverImage.extraLarge}` }}/>
        <Text className="text-sm font-medium text-black text-center">{item.title.english}</Text>  
        <Text className="text-xs text-gray-500">{item.title.native}</Text> 
        <Text className="text-xs text-gray-500">{item.seasonYear} - Episodes : {item.episodes}</Text> 
        </View>
        </TouchableOpacity>
        )

    const navigation = useNavigation();


    //Page Anime List
    function ListScreen({}){
      return (
      <SafeAreaView>
          <View className="mt-10 items-center">

          <SearchBar
          data={data}
          renderItem={(item) => renderItem(item)}
          />

          </View>

          <View className="mt-8 mb-4 ml-6 mr-4 items-center ">

          <Text className="text-lg font-bold">
                Populaire
          </Text>

          </View> 

          <FlatList className="flex flex-col" 
          data={data}
          showsHorizontalScrollIndicator={false} 
          showsVerticalScrollIndicator={false} 
          numColumns={2}
          keyExtractor={(item, index) => {return item.id;}} 
          renderItem={({item}) => renderItem(item)} 
          />
   
      </SafeAreaView>
      );
    }

    function Details({ route }) {
      const { item } = route.params;
      return (
        <SafeAreaView>
       
          <Image className="h-[250px]" source={{ uri: `${item.coverImage.extraLarge}` }}/> 
          <LinearGradient  style={styles.background} colors={[ 'transparent', 'rgba(255,255,255,1)']} start={{x:0.5, y:0.5}} end={{x:0.5, y:1}} />
        <View className="item-center m-5">

        <Text className="text-2xl font-ligh">{item.title.english}</Text>
        <TouchableOpacity onPress={() => toggleFavorite(item.id)} className="bg-black self-end absolute opacity-75 w-[auto] h-[auto] p-1 m-2 rounded-lg  ">
          <Ionicons name={favorites[item.id] ? 'heart' : 'heart-outline' } size={24} color={favorites[item.id] ? 'red' : 'gray'} />
        </TouchableOpacity>

       
        <Text className="text-lg italic font-normal text-gray-400">{item.title.romaji} (original)</Text>
        <Text className="">Episodes : {item.episodes}</Text>
        <Text className="">{item.seasonYear}</Text>
        <Text className="text-xl font-medium mt-2 mb-2">Synopsis</Text>
        <Text className="text-justify font-normal">{item.description}</Text>       
        </View>

        </SafeAreaView>
      );
    }


return (
    <Stack.Navigator>
      <Stack.Screen name="List" component={ListScreen} options={{headerShown: false, cardStyle: { backgroundColor: "transparent" }}} />
      <Stack.Screen name="Details" component={Details}  options={{ headerTransparent: true, title: ''}} />
    </Stack.Navigator>
  );
   


}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    bottom: 0,
    height: 150
  },
});

export default HomeScreen
