import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Header} from '../../components';
import service from '../../global/service';
// import currencies from '../../global/currencies.json';
import {getStore, storeData, storeRemoveData} from '../../global/util';
import DropDownPicker from 'react-native-dropdown-picker';
import {default_url, fonts} from '../../global/constanants';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../store/Context';

// https://free.currconv.com/api/v7/convert?q=USD_QAR&compact=ultra&apiKey=c51953d4f4608a064655

// https://free.currconv.com/api/v7/currencies?apiKey=c51953d4f4608a064655

export default function Settings() {
  const [profile, setProfile] = useState();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState();
  const [loading, setLoading] = useState(false);
  const nav = useNavigation()
  const store = useContext(AppContext)
  // console.log("=======currency=======>", store.currency);

  async function getProfile() {
    var curr_ = Object.entries(store.currency).map(__ => ({
      label: __[1].symbol,
      value: {currency: __[1].symbol, value: __[1].price},
    }));
    setItems(curr_);

    var active_curr = JSON.parse(await getStore('@currency'));
    var user = JSON.parse(await getStore('@user'));

    // setProfile({'currency':active_curr, userId});
    setProfile({...active_curr, ...user});

    // service.get(
    //   // 'https://free.currconv.com/api/v7/currencies?apiKey=c51953d4f4608a064655',
    //   'https://openexchangerates.org/api/currencies.json',
    //   (err, res) => {
    //     var currencies = Object.entries(res.results).map(__ => ({
    //       label: __[0]+ ' - ' + __[1],
    //       value: __[0],
    //     }));
    //     setItems(currencies);

    //     // console.log('>>>', user);
    //     // console.log('---', JSON.parse(user).currency);

    //   //   setProfile({
    //   //     ...user,
    //   //     currency: Object.keys(JSON.parse(user).currency)
    //   //       .toString()
    //   //       .replace('USD_', ''),
    //   //   });
    //   },

    //   setProfile(user)
    // );
  }

  async function setCurrency(value) {
    setProfile(value);
    storeData('@currency', value);
  }


  useEffect(() => {
    getProfile();
  }, []);

  function _deleteMyAccount() {
    if(!profile?.userId){
      alert("something went wrong!, try later")
      return
    }
    setLoading(true);

    const body = {user_id: profile?.userId}
    service.delete(default_url + '/user/deleteUser', body, (status, res) => {
      console.log('res-----', status, res);
      if (status == 200) {
        // if (res.status) {
        storeRemoveData('@user');
        // Alert.alert('Account Deleted');
        nav.navigate('Login');

        // } else seterr(res.error);
        setLoading(false);
      } else {
        Alert.alert('Network err!');
      }
    });

  }
  

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <Header homeHeader={false} title="Profile" canGoBack />
      {/* <Text style={{color: '#000'}}>Settings</Text> */}
      <View
        style={{
          margin: 22,
          padding: 15,
          borderWidth: 1,
        }}>
        <View>
          <Text style={{color: '#000'}}>Currency</Text>
          {profile?.currency && (
            <Text style={{...fonts.bold_font}}>{profile.currency}</Text>
          )}
        </View>
      </View>

      <Text style={{color: '#000', margin: 22, marginBottom: 0}}>
        Change Currency
      </Text>

      {items && (
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onChangeValue={value => setCurrency(value)}
          style={{marginTop: 10}}
          containerStyle={{
            margin: 22,
            marginTop: 0,
            width: '90%',
          }}
        />
      )}

      <Text style={{color: '#000', margin: 22, marginBottom: 0}}>
        Delete my account
      </Text>

      <TouchableOpacity
      onPress={()=> _deleteMyAccount()}
        style={styles.deleteButton}>
        {loading ? <ActivityIndicator color='tomato'/> :  <Text style={{color: 'tomato'}}>Delete</Text>}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 5,
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: 'tomato',
    margin: 22,
    padding: 10,
    alignSelf: 'flex-start',
  }
});