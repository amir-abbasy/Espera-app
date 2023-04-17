import {View, Text, Image} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {getStore, storeRemoveData} from '../global/util';
import service from '../global/service';
import {default_url} from '../global/constanants';
import {AppContext} from '../store/Context';

export default function Splash() {
  const nav = useNavigation();
  const store = useContext(AppContext);

  useEffect(() => {
    if (!store?.currency) _getCurrencies();
    else navigate();
  }, []);

  function navigate() {
    setTimeout(async () => {
      var user = await getStore('@user');
      if (user) nav.navigate('Main');
      else nav.navigate('Login');
    }, 1000);
  }

  // getCurrencies
  function _getCurrencies() {
    service.get(default_url + '/data/getCurrencies', (err, res) => {
      console.log('-----', res, err);
      if (res.status) {
        store.setCurrency(res.data);
        navigate();
      } else {
        alert('app config err!');
      }
    });
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#444444',
      }}>
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
  );
}
