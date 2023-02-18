import React, { useCallback, useEffect, useState, Component } from 'react';
import { Button, Text,FlatList, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView,ScrollView } from 'react-navigation';
import {Image} from 'react-native' ; 
import Icon from 'react-native-vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../../components/ProfileComponent';

const HomeScreen = () => {
    const [data, setData] = useState([]);  
    const Stack = createNativeStackNavigator();
    const api = {
      async getPopularAnime (){
          var query = `query ($page: Int, $perPage: Int,) {
            Page(page: $page, perPage: $perPage) {
              pageInfo {
                total
                perPage
                currentPage
                lastPage
                hasNextPage
              }
              media(type: ANIME, sort:POPULARITY_DESC ,isAdult: false) {
                id
                seasonYear
                status
                episodes
                favourites
                description (asHtml : false)
                title {
                  romaji
                  english
                  native
                }
                coverImage {
                  extraLarge
                  large
                  medium
                  color
                }
                type
                genres
                characters (sort: FAVOURITES_DESC) {
                  pageInfo {
                    total
                    perPage
                    currentPage
                    lastPage
                    hasNextPage
                  }
                  nodes{
                    id
                    favourites
                    gender
                    image{
                     large
                    }
                    name {
                      full
                      native
                    }
                  }
                }
              }
            }
          }
          `

          
              
              // Define our query variables and values that will be used in the query request
              var variables = {
              page : 1,
              perPage: 10,
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

            <View className="mt-12 mb-2 items-end">
              
            </View>
            
            <View className="flex flex-row justify-between mt-8 mb-4 ml-6 mr-4 ">
           <Text className="text-lg font-bold">
                Populaire
              </Text>
              <Text className="text-lg font-light">
                voir plus  
              </Text>   
            </View>
          
            <FlatList className="flex" 
          showsHorizontalScrollIndicator={false} 
          horizontal keyExtractor={(item, index) => {return item.id;}} data={data}
          renderItem={({item}) => renderItem(item)} />
           
           <View className="flex flex-row text-center justify-between mt-2 mb-4 ml-6 mr-4 ">

           <Text className="text-lg font-bold">
                En ce moment
              </Text>
              <Text className="text-lg font-light">
                voir plus
              </Text>  
            </View>
            <FlatList className="flex" showsHorizontalScrollIndicator={false} horizontal keyExtractor={(item, index) => {return item.id;}} data={data}
          renderItem={({item}) => renderItem(item)} />
        </SafeAreaView>
      );

    }

// Page de Details
    function Details({ route }) {
      const { item } = route.params;
    
      return (
        <SafeAreaView>



          <Image className="h-[250px]" source={{ uri: `${item.coverImage.extraLarge}` }}/> 
          <LinearGradient  style={styles.background} colors={[ 'transparent', 'rgba(255,255,255,1)']} start={{x:0.5, y:0.5}} end={{x:0.5, y:1}} />
     
        <View className="item-center m-5">
       
        <Text className="text-2xl font-ligh">{item.title.english}</Text>
        <Text className="text-lg italic font-normal text-gray-400">{item.title.romaji} (original)</Text>
        <Text className="">Episodes : {item.episodes}</Text>
        <Text className="">{item.seasonYear}</Text>
        <Text className="text-xl font-medium mt-2 mb-2">Synopsis</Text>
        <Text className="text-justify font-normal">{item.description}</Text>

        <Text className="text-2xl font-medium tracking-widest text-center">
                Personnages
              </Text>

             
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
