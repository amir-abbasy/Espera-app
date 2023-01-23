import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

import {TimeLine, Header} from '../../components';
import service from '../../global/service';
import {colors, default_url, fonts} from '../../global/constanants';
import {getStore, storeRemoveData} from '../../global/util';

const settings_list = [
  {name: 'Personal Details', screen: 'Details'},
  {name: 'Wishlist', screen: 'WishList'},
  {name: 'Active Coupons', screen: 'Coupen'},
  {name: 'Settings', screen: 'Settings'},
  {name: 'Logout', screen: 'Login'},
];


// var user_id = getStore('@user')
const ListItem = props => {
  const nav = useNavigation();


  function logout() {
    // LOGOUT
    storeRemoveData('@user');
    nav.navigate('Login');
  }
  

  return (
    <TouchableOpacity
      onPress={() =>
        props.item.name == 'Logout' ? logout() : nav.navigate(props.item.screen)
      }
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        borderRadius: 10,
        paddingVertical: 10,
        marginHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#0f0fff15',
        //   Shadow
        // elevation: 10,
        // shadowOpacity: 1,
        // shadowColor: '#444444',
      }}>
      <Text style={{...fonts.reg_font}}>{props.item.name}</Text>
      <MaterialIcons
        name="arrow-forward-ios"
        color="#44444470"
        size={20}
        style={{marginTop: 5}}
      />
    </TouchableOpacity>
  );
};

export default function Profile() {
  const [profile, setProfile] = useState();
  async function getProfile() {
    var user = JSON.parse(await getStore('@user')).user;
    // console.log("....user....-....", user);
    service.get(default_url + '/user/getUser/username/' + user, (err, res) => {
      // console.log('-----', res, err);
      setProfile(res[0]);
    });
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <Header homeHeader={false} title="Profile" />
      {profile ? (
        <ScrollView style={styles.root}>
          <View style={{alignItems: 'center'}}>
            <IconFA
              onPress={() => nav.navigate('Profile')}
              name="user"
              color="#444444"
              size={50}
              style={{margin: 20}}
            />
            <Text style={styles.name}>{profile.fullname}</Text>
            <Text style={styles.email}>{profile.username}</Text>
          </View>

          {/* Time Line */}
          <TimeLine />

          <FlatList
            data={settings_list}
            renderItem={({item}, index) => <ListItem item={item} />}
            keyExtractor={(_, k) => k.toString()}
            contentContainerStyle={{marginTop: 20}}
          />
        </ScrollView>
      ) : (
        <ActivityIndicator color={colors.primary} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: '900',
    color: '#444444',
  },
  email: {
    fontSize: 14,
    color: '#444444',
  },
});