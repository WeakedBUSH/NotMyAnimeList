import React, { useCallback, useEffect, useState } from 'react';
import { Button, Text,FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView, } from 'react-navigation';
import {Image} from 'react-native' ; 
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const HomeScreen = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const Stack = createNativeStackNavigator();
    const api = {
      async getPopularAnime (){
          var query = `query ($page: Int, $perPage: Int,) {
              Page (page: $page, perPage: $perPage) {
                pageInfo {
                  total
                  perPage
                }
                media (type: ANIME, sort: POPULARITY_DESC){
                  id
                  seasonYear
                  status
                  episodes
                  favourites
                  title {
                      romaji
                      english
                      native
                  }
                  coverImage{
                      extraLarge
                      large
                      medium
                      color
                  }
                  type
                  genres
                }
                
              }
              }`
              
              // Define our query variables and values that will be used in the query request
              var variables = {
              page : 1,
              perPage: 5,
              };
              
              
              // Define the config we'll need for our Api request
              var url = 'https://graphql.anilist.co',
              options = {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',
                  },
                  body: JSON.stringify({
                      query: query,
                      variables: variables
                  })
              };
              
              // Make the HTTP Api request
              fetch(url, options).then(handleResponse)
                             .then(handleData)
                             .catch(handleError);
              
              function handleResponse(response) {
              return response.json().then(function (json) {
                  return response.ok ? json : Promise.reject(json);
              });
              }
              
              
              function handleData(data) {
              setData(data.data.Page.media);
              
              console.log('---------------------------')
              console.log(data);
              console.log('---------------------------')
              
              
              }
              
              function handleError(error) {
              alert('Error, check console');
              console.error(error);
              }
      }
  
    }
       useEffect(() => {
        api.getPopularAnime();
      }, []);
    const renderItem = (item) => (
        // ajouter component card 
        <TouchableOpacity onPress={() => navigation.navigate('Details',{item})}>
        <View className="w-[150px] h-auto items-center m-5">
        <Image className="rounded-3xl w-[150px] h-[250px]" source={{ uri: `${item.coverImage.extraLarge}` }}/>
        <Text className="text-sm font-medium text-white">{item.title.english}</Text>  
        <Text className="text-xs text-gray-500">{item.title.native}</Text> 
        <Text className="text-xs text-gray-500">{item.seasonYear} - Episodes : {item.episodes}</Text> 
        </View>
        </TouchableOpacity>)
    const navigation = useNavigation();

    function ListScreen({}){
      return (
        <SafeAreaView className="m-4">
            <View className="w-screen mt-12 mb-2 items-center">
              <Text className="text-3xl font-bold tracking-widest text-center w-6/12">
                NMAL
              </Text>
            </View>
            <View className="w-screen flex mt-8 mb-4 ">
              <Text className="text-xl font-bold self-start w-6/12">
                Populaire
              </Text>
            </View>
            <FlatList className="flex"
          horizontal
          keyExtractor={(item, index) => {return item.id;}}          
          data={data}
          renderItem={({item}) => renderItem(item)}
          />
          <View className="w-screen flex mt-2 mb-4">
              <Text className="text-xl self-start w-6/12">
                Cette saison
              </Text>
            </View>
        </SafeAreaView>
      );
    }

    function Details({ route }) {
      const { item } = route.params;
      return (
        <SafeAreaView>
        <View className="w-screen h-screen mr-10 relative">
        <Image className="absolute w-screen h-2/4 " source={{ uri: `${item.coverImage.extraLarge}` }}/>
        <View className=" absolute  h-2/4 w-screen "></View>
        </View>
        </SafeAreaView>
      );
    }
return (
    <Stack.Navigator>
      <Stack.Screen name="List" component={ListScreen} options={{headerShown: false}} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
   


}


export default HomeScreen
