import React, { useCallback, useEffect, useState } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { useNavigation } from '@react-navigation/native';

const FavoriteScreen = () => {
    const s = require ("../../style");
    const navigation = useNavigation();
    const [isFavorite] = useState(true);

    return (
        <SafeAreaView style={s.container}>
            <View>
                <Text style={s.title}>
                    Favorites
                </Text>
                {isFavorite ? <Text>Aucun favoris ajoutez en !</Text> :  (<FlatList data={anime} renderItem={renderItem} keyExtractor={(item) => item.id} />)
           }  
            </View>
        </SafeAreaView>
    );
    
}


export default FavoriteScreen
