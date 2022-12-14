import React, { useCallback, useEffect, useState } from 'react';
import { Button, Text,FlatList, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {Image} from 'react-native' ; 
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
const HomeScreen = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const GetCurrentlyPopularAnime = () => {
        // Here we define our query as a multi-line string
        // Storing it in a separate .graphql/.gql file is also possible
var query = `query ($page: Int, $perPage: Int,) {
    Page (page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
      }
      media (type: ANIME, sort: POPULARITY_DESC){
        id
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
    const GetRandomAnimeQuote = () =>{
        fetch('https://animechan.vercel.app/api/random')
        .then(response => response.json())
        .then(quote => setQuote(quote))
 
    }
       useEffect(() => {
        GetCurrentlyPopularAnime();
      }, []);

    const s = require ("../../style");
    const renderItem = (anime) => (
        // ajouter component card perso
        <View style={s.item}>
        <Image style={{height: 100, resizeMode: 'contain', }} source={{ uri: `${anime.coverImage.medium}` }}/>
        <Text style={s.subtitle}>{anime.title.english}</Text> 


        </View>
    )
        
     
      
  
    const navigation = useNavigation();

    return (
      <SafeAreaView style={s.container}>
        <View>
          <Text style={s.title}>HomeScreen</Text>
        </View>
          <FlatList
        keyExtractor={(item, index) => {return item.id;}}          
        data={data}
        renderItem={({item}) => renderItem(item)
        }
        />
        
      </SafeAreaView>
    );
    
}


export default HomeScreen
