import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Currency, Header, Progress} from '../components';

import {default_url, fonts, colors} from '../global/constanants';
import service from '../global/service';
import {getStore} from '../global/util';
import AntDesign from 'react-native-vector-icons/AntDesign';

const heart = require('../../assets/icons/heart.png');

export default function ContestDetails(props) {
  console.log('props', props.route.params.con_id);
  const [showReward, setShowReward] = useState(false);
  const [isFav, setIsFav] = useState(false);

  const [contest, setContest] = useState();
  const con_id = props.route.params.con_id;

  useEffect(() => {
    service.get(
      default_url + `/contest/getOneWithProduct/${con_id}`,
      (err, res) => {
        setContest(res[0]);
      },
    );
  }, []);

  const _addToCart = async () => {
    var userId = JSON.parse(await getStore('@user')).userId;
    service.get(
      default_url +
        `/contest/orderSpot/${userId}/${con_id}/${contest.product_id}`,
      (err, res) => {
        // console.log("----------------", res);
        props.navigation.navigate('Cart');
      },
    );
  };

  const _addToFav = async () => {
    var user_id = JSON.parse(await getStore('@user')).userId;
    service.post(
      default_url + `/user/addToWishList`,
      {user_id, con_id},
      (err, res) => {
        // console.log('----------------', err, res);
        setIsFav(true);
      },
    );
  };

  // console.log("contest", contest);

  return (
    <>
      <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
        <Header homeHeader={false} title="Contest Details" canGoBack={true} />
        {contest ? (
          <ScrollView style={styles.root}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Progress
                value={(contest.con_spots * 100) / contest.con_total_spots}
                data={{
                  con_total_spots: contest.con_total_spots,
                  con_spots: contest.con_spots,
                }}
              />
              <TouchableOpacity
                onPress={() =>
                  !isFav
                    ? _addToFav()
                    : Alert.alert('Remove from wishlist page')
                }>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={heart}
                    resizeMode="contain"
                    style={{
                      width: 22,
                      height: 22,
                      tintColor: isFav ? 'red' : '#444444',
                    }}
                  />
                </View>
              </TouchableOpacity>

              {/* <AntDesign
                name={isFav ? 'heart' : 'hearto'}
                color={isFav ? 'red' : '#444444'}
                size={20}
                style={{marginLeft: 10}}
                onPress={() =>
                  !isFav
                    ? _addToFav()
                    : Alert.alert('Remove from wishlist page')
                }
              /> */}
            </View>

            <View>
              <Image
                // source={require('../assets/car.png')}
                source={{
                  uri: !showReward
                    ? default_url +
                      '/images/contest_cover/' +
                      contest.con_thumbnails
                    : default_url + '/images/products/' + contest.pr_thumbnails,
                }}
                style={{width: '100%', height: 175}}
                resizeMode="contain"
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderWidth: 2,
                borderRadius: 25,
                borderColor: '#444444',
                marginVertical: 20,
              }}>
              <TouchableOpacity
                style={[styles.button, showReward && {backgroundColor: '#fff'}]}
                onPress={() => setShowReward(!showReward)}>
                <Text
                  style={[styles.buttonText, showReward && {color: '#444444'}]}>
                  Prize details
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  !showReward && {backgroundColor: '#fff'},
                ]}
                onPress={() => setShowReward(!showReward)}>
                <Text
                  style={[
                    styles.buttonText,
                    !showReward && {color: '#444444'},
                  ]}>
                  Product Details
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={{...fonts.reg_font, fontSize: 11}}>
              Max draw date:{' '}
              {new Date(contest?.con_enddate).toLocaleDateString()}
            </Text>

            <Text style={styles.name}>
              {!showReward ? 'Get a chance to WIN :' : 'Buy our'}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.price}>
                {!showReward ? contest?.con_win : contest.pr_name + ' for '}
              </Text>
              {showReward && <Currency size="lg" value={contest.pr_price} />}
            </View>
            <Text style={styles.discription}>
              {!showReward ? contest?.con_discription : contest?.pr_discription}
            </Text>
          </ScrollView>
        ) : (
          <ActivityIndicator loading color={colors.primary} />
        )}
      </SafeAreaView>
      <View
        style={{
          backgroundColor: '#444444',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          padding: 20,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          alignItems: 'center',
        }}>
        <View style={{width: '60%'}}>
          {contest && (
            <>
              <Text style={{color: '#fff'}}>Buy a {contest.pr_name}</Text>
              <Currency
                value={contest.pr_price}
                size="md"
                style={{color: 'white'}}
              />
            </>
          )}
          <Text style={{color: '#fff'}}>Inclusive of VAT</Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            borderRadius: 25,
            height: 45,
            paddingHorizontal: 20,
            textAlign: 'center',
            justifyContent: 'center',
          }}
          onPress={() => _addToCart()}>
          <Text style={{color: '#444444', fontWeight: '900'}}>ADD TO CART</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 20,
  },
  name: {
    ...fonts.reg_font,
    fontSize: 20,
  },
  price: {
    ...fonts.reg_font,
    fontSize: 25,
    fontWeight: '900',
  },
  discription: {
    ...fonts.reg_font,
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#444444',
    padding: 10,
    borderRadius: 20,
    width: '50%',
  },
  buttonText: {
    ...fonts.reg_font,
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
