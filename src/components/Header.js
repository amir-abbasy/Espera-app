import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const user = require('../../assets/icons/user.png');
const GoBack = require('../../assets/icons/bkarrow.png');

export default function Header(props) {
  const nav = useNavigation();
  return (
    <View
      style={{
        padding: 10,
        position: props?.homeHeader ? 'absolute' : 'relative',
        top: props?.sectionHome ? 55 : 0,
        zIndex: 999,
        width: '100%',
        paddingRight: 20,
        borderColor: '#444444',
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          {props?.canGoBack && (
            <TouchableOpacity onPress={() => nav.goBack()}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={GoBack}
                  resizeMode="contain"
                  style={{
                    width: 22,
                    height: 22,
                    // tintColor: focused
                    //   ? MyColors.GRADIENT_ONE
                    //   : MyColors.LABEL_COLOR,
                  }}
                />
              </View>
            </TouchableOpacity>
            // <MaterialIcons
            //   name="arrow-back-ios"
            //   color="#444444"
            //   size={20}
            //   style={{marginLeft: 10}}
            //   onPress={() => nav.goBack()}
            // />
          )}
          {props?.homeHeader && (
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
          )}

          {props?.title && (
            <Text
              style={{
                ...styles.appName,
                color: props?.homeHeader ? '#fff' : '#444',
              }}>
              {props.title}
            </Text>
          )}
        </View>
        {!props?.canGoBack && (
          <TouchableOpacity onPress={() => nav.navigate('Profile')}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={user}
                resizeMode="contain"
                style={{
                  width: 22,
                  height: 22,
                  // tintColor: focused
                  //   ? MyColors.GRADIENT_ONE
                  //   : MyColors.LABEL_COLOR,
                }}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
});
