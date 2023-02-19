import React, {useState, useCallback, useEffect } from 'react';
import { FlatList, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../HomeScreen/HomeScreen'
const FavoriteScreen = (data) => {
  const [favorites, setFavorites] = useState({});
  const [filteredFavorites, setFilteredFavorites] = useState([]);

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
    loadFavorites();
  }, [loadFavorites]);

  useEffect(() => {
    const filtered = data.filter((item) => favorites[item.id]);
    setFilteredFavorites(filtered);
  }, [favorites, data]);

  const renderItem = (item) => (
    <TouchableOpacity onPress={() => navigation.navigate('Details',{item})}>
      <View className="w-[150px] h-auto items-center m-5">
        <Image className="rounded-3xl w-[150px] h-[250px]" source={{ uri: `${item.coverImage.extraLarge}` }}/>
        <Text className="text-sm font-medium text-black text-center">{item.title.english}</Text>  
        <Text className="text-xs text-gray-500">{item.title.native}</Text> 
        <Text className="text-xs text-gray-500">{item.seasonYear} - Episodes : {item.episodes}</Text> 
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView>
      <FlatList
        data={filteredFavorites}
        showsHorizontalScrollIndicator={false} 
        showsVerticalScrollIndicator={false} 
        numColumns={2}
        keyExtractor={(item, index) => {return item.id;}} 
        renderItem={({item}) => renderItem(item)} 
      />
    </SafeAreaView>
  );
}


export default FavoriteScreen;