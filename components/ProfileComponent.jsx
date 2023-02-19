import React, { useState, useEffect } from 'react';
import {ImageViewer, View, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const Profile = () => {
  
  const [selectedImage, setSelectedImage] = useState(null);
  const DefaultAvatarImg = require("../assets/medias/avatar/defaultavatar.png")
  
  const pickImageAsync= async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,

    })
    if(!result.canceled){
      selectedImage(result.assets[0].uri);
    }else{
        alert('Aucune image selectionné.');
    }
  }
  return (
    <TouchableOpacity onPress={pickImageAsync}>
            <View style={ProfileStyles.avatar}>

            <ImageViewer
            placeholderImageSource={DefaultAvatarImg}
            selectedImage={selectedImage}
            />

            </View>

            </TouchableOpacity>
        
  );
}
const ProfileStyles=StyleSheet.create({
  avatar:{
    height: 80,
    width: 80,
    margin: 10,
    borderRadius: 999,
    backgroundColor: 'gray',
  }
})

export default Profile;