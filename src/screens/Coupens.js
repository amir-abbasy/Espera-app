import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { CartItemCard, Header } from '../components';
import service from '../global/service';
import { getStore } from '../global/util';
import { default_url } from '../global/constanants';
import { useIsFocused } from '@react-navigation/native';


export default function Coupens() {

  const [myCoupens, setMyCoupens] = useState();
  const isFocused = useIsFocused()

  useEffect(() => {
    getCartItems()
  }, [isFocused])


  const getCartItems = async () => {
    var user = JSON.parse(await getStore('@user')).userId;
    service.get(default_url + `/contest/getMyOrders/${user}/complete`, (err, res) => {
      if (res.length > 0) {
        setMyCoupens(res)
      }
    })
  }

  return (
    <>
      <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
        <Header homeHeader={false} title="My Coupens" />
        {!myCoupens ? <Text style={{ textAlign: 'center', color: '#000' }}>No items</Text> :
          myCoupens.map((coupen, _) => {
            return <View key={_}>
              <View style={{ borderWidth: 2, marginHorizontal: 10, padding: 30, paddingVertical: 10, borderColor: '#ccc', backgroundColor: '#cccccc40', marginVertical: 5, justifyContent: 'flex-start' }}>
                <Text style={{ color: '#000' }}>Coupen number: </Text>
                <Text style={{ color: '#000', fontWeight: '900', fontSize: 20 }}>{coupen.coupen}</Text>
                <Text style={{ color: '#000' }}>Start Date : {new  Date(coupen.order_date).toLocaleDateString()}</Text>
                <Text style={{ color: '#000' }}>Draw Date : {new Date(coupen.con_enddate).toLocaleDateString()}</Text>
                <Text style={{ color: '#000' }}>contest id : {coupen.con_id}</Text>
                <Text style={{ color: '#000' }}>Coupen Price : {coupen.pr_price} /-</Text>
              </View>
            </View>
          })
        }

      </SafeAreaView>
    </>
  );
}
