import {View, Text, StyleSheet, Image} from 'react-native';
import React, { useContext } from 'react';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {AppContext} from '../store/Context';

export default function Header(props) {
  const nav = useNavigation();
  const store = useContext(AppContext);

  return (
    <View
      style={{
        padding: 10,
        position: props?.homeHeader ? 'absolute' : 'relative',
        top: 0,
        zIndex: 999,
        width: '100%',
        paddingRight: 20,
        borderColor: '#444444',
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          {props?.canGoBack && (
            <MaterialIcons
              name="arrow-back-ios"
              color="#444444"
              size={20}
              style={{marginLeft: 10}}
              onPress={() => nav.goBack()}
            />
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
        {!props?.canGoBack && store?.user && (
          <IconFA
            onPress={() => nav.navigate('Profile')}
            name="user"
            color={props?.homeHeader ? '#fff' : '#444444'}
            size={25}
          />
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
