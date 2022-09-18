import { View, Text, Image} from 'react-native'
import React, { useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import {getStore, storeRemoveData} from '../global/util';


export default function Splash() {
    const nav = useNavigation()
    useEffect(()=>{
        setTimeout(async() => {
        var user = await getStore('@user')
        if(user)nav.navigate('Main')
        else nav.navigate('Login')
        }, 1000);
    })
  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#444444'}}>
         <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../assets/logo_light.png')}
                style={{width: 40, height: 35}}
              />
              <Image
                source={require('../assets/name_light.png')}
                style={{width: 125, height: 25}}
              />
            </View>
    </View>
  )
}