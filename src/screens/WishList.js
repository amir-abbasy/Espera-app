import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Button,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {CartItemCard, Header} from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors, default_url, fonts} from '../global/constanants';
import service from '../global/service';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useIsFocused} from '@react-navigation/native';
import {AppContext} from '../store/Context';

// {"id":1,"con_id":"con_d5eee96e237a","user_id":"usr_20e104abc603","username":"ammar","fullname":"ammar va","user_password":"123456","email":"ammar@gmail.com","profile_pic":null,"mobile":"65987452","user_address":"Al House ","total_spent":null,"isStaff":1,"referrelUserId":null,"product_id":"pr_fcec17b187bb","con_status":"draw","con_total_spots":"5","con_spots":"5","con_startdate":"2022-07-12T17:14:00.000Z","con_enddate":"2022-07-15T17:16:00.000Z","con_win":"2022 Tesla Model Y","con_discription":" The EV automaker’s latest model, a luxury compact SUV, is built with an elevated seating position and low dash giving its driver a commanding view of the road ahead. The interior of Model Y is simple and clean, with a 15-inch touch screen, immersive soun","con_thumbnails":"440-CR-00072.png","con_winner":null,"con_winnerCoupen":null}

export default function WishList() {
  const [lists, setLists] = useState();
  const isFocused = useIsFocused();

  // const store = useContext(AppContext);
  // console.log('=------------------->', store);

  useEffect(() => {
    _getData();
  }, [isFocused]);

  const _getData = async _ => {
    const user_ = await AsyncStorage.getItem('@user');
    const userId = JSON.parse(user_).userId;
    service.get(default_url + '/user/getWishLists/' + userId, (status, res) => {
      // console.log('-----', status, res.data);
      if (status == 200) {
        setLists(res.data);
      }
    });
  };

  const _remFromWishList = async value => {
    service.delete(
      default_url + '/user/removeFromWishList',
      {item_id: value},
      (status, res) => {
        console.log('-----', status, res);
        _getData();
      },
    );
  };

  const renderItem = ({item}) => {
    var isComplete = item.con_total_spots == item.con_spots;
    return (
      <View style={{padding: 10, display: 'flex', flexDirection: 'row'}}>
       
        <View>
          <Image
            // source={require('../assets/car.png')}
            source={{
              uri: default_url + '/images/contest_cover/' + item.con_thumbnails,
            }}
            style={{
              width: 100,
              height: 100,
              backgroundColor: '#11111105',
              borderRadius: 15,
              marginRight: 5,
            }}
            resizeMode="contain"
          />
        </View>

        <View style={{width: '70%'}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={{fontSize: 14, ...fonts.bold_font}}>
                {item.con_win}
              </Text>
              <Text style={{}}>{item.con_id}</Text>
            </View>

            <TouchableOpacity
              onPress={() => _remFromWishList(item.wishitem_id)}>
              <MaterialIcons
                name="delete"
                color="#444444"
                size={20}
                style={{marginLeft: 10}}
              />
            </TouchableOpacity>
          </View>

          <Text style={{fontSize: 10}} numberOfLines={2}>
            {item.con_discription}
          </Text>
          <Text style={{color: isComplete ? 'tomato' : 'teal'}}>
            {isComplete
              ? 'Completed'
              : item.con_spots + ' / ' + item.con_total_spots}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <>
      <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
        <Header homeHeader={false} title="My Wishlist" />
        <FlatList
          data={lists}
          // keyExtractor={(_)=> _}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={() => (
            <Text
              style={{
                ...fonts.reg_font,
                marginVertical: 20,
                textAlign: 'center',
              }}>
              No items
            </Text>
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    margin: 5,
  },
});
