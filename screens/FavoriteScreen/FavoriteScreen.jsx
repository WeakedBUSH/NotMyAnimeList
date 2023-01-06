import React, { useCallback, useEffect, useState } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { useNavigation } from '@react-navigation/native';

const FavoriteScreen = () => {
    const navigation = useNavigation();
    const [isFavorite] = useState(true);

    return (
        <SafeAreaView >
            <View>
                <Text>
                    Favorites
                </Text>
                {isFavorite ? <Text>Aucun favoris ajoutez en !</Text> :  (<FlatList data={anime} renderItem={renderItem} keyExtractor={(item) => item.id} />)
           }  
            </View>
        </SafeAreaView>
    );
    
}


export default FavoriteScreen
