import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {CartItemCard, Header} from '../components';
import service from '../global/service';
import {getStore} from '../global/util';
import {default_url} from '../global/constanants';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import { AppContext } from '../store/Context';

export default function Coupens() {
  const [myCoupens, setMyCoupens] = useState();
  const isFocused = useIsFocused();
  const store = useContext(AppContext);
  const nav = useNavigation();

  useEffect(() => {
    getCartItems();
  }, [isFocused]);

  const getCartItems = async () => {
    if (!store.user) return;
    var user = JSON.parse(await getStore('@user')).userId;
    service.get(
      default_url + `/contest/getMyOrders/${user}/complete`,
      (err, res) => {
        if (res.length > 0) {
          setMyCoupens(res);
        }
      },
    );
  };

  if (!store?.user) {
    return (
      <View>
        <Header homeHeader={false} title="My Coupens" />
        <Text style={{textAlign: 'center', padding: 40, color: '#0000ff'}} onPress={() => nav.navigate('Register')}>Create an account!</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
        <Header homeHeader={false} title="My Coupens" />
        {!myCoupens ? (
          <Text style={{textAlign: 'center', color: '#000'}}>No items</Text>
        ) : (
          myCoupens.map((coupen, _) => {
            return (
              <View key={_}>
                <View
                  style={{
                    borderWidth: 2,
                    marginHorizontal: 10,
                    padding: 20,
                    paddingVertical: 10,
                    opacity: coupen?.con_status == 'complete' ? 0.5 : 1, 
                    borderColor:
                      coupen?.con_status == 'complete' ? '#f7b72350' : '#23f782',
                    backgroundColor:
                      coupen?.con_status == 'complete'
                        ? '#f7b72310'
                        : '#23f78220',
                    marginVertical: 5,
                    justifyContent: 'flex-start',
                  }}>
                  <Text style={{color: '#000'}}>Coupen number: </Text>
                  <Text
                    style={{color: '#000', fontWeight: '900', fontSize: 16}}>
                    {coupen.coupen}
                  </Text>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View>
                      <Text style={{color: '#000', fontSize: 10}}>
                        Start Date :{' '}
                        {new Date(coupen.order_date).toLocaleDateString()}
                      </Text>
                      <Text style={{color: '#000', fontSize: 10}}>
                        Draw Date :{' '}
                        {new Date(coupen.con_enddate).toLocaleDateString()}
                      </Text>
                    </View>

                    <View style={{marginLeft: 20}}>
                      <Text style={{color: '#000', fontSize: 10}}>
                        contest id : {coupen.con_id}
                      </Text>
                      <Text style={{color: '#000', fontSize: 10}}>
                        Coupen Price : {coupen.pr_price} /-
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })
        )}
      </SafeAreaView>
    </ScrollView>
  );
}
