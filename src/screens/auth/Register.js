import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Linking,
} from 'react-native';
import service from '../../global/service';
import {default_url, colors, fonts} from '../../global/constanants';
import {storeData} from '../../global/util';
import {useNavigation} from '@react-navigation/native';
import TandC from '../TandC';
import {Modal} from '../../components';

export default function Register({navigation}) {
  const [refId, setRefId] = useState({
    isValid: false,
    staff: null,
  });
  const [username, setUsename] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [err, seterr] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);

  const nav = useNavigation();
  console.log(refId);

  const submit = () => {
    var err = false;
    seterr('');

    if (refId.staff == null || refId.staff == '') {
      seterr(`Enter referrel id`);
      err = true;
      return;
    }

    if (username.length < 1) {
      seterr(`Enter Username`);
      err = true;
      return;
    }
    if (fullname.length < 1) {
      seterr(`Enter Fullname`);
      err = true;
      return;
    }
    if (phone.length < 1) {
      seterr(`Enter Phone Number`);
      err = true;
      return;
    }
    if (email.length < 1) {
      seterr(`Enter email`);
      err = true;
      return;
    }

    if (password.length < 6) {
      seterr(`Password must be 6 characters or more`);
      err = true;
      return;
    }

    if (password != confirmPassword) {
      seterr(`Password doe's not match`);
      err = true;
      return;
    }

    if (!err) _register();
    else setLoading(false);
  };

  const _register = () => {
    setLoading(true);
    const body = {
      referrelUserId: refId.staff.user_id,
      username: username,
      fullname: fullname,
      user_password: confirmPassword,
      email: email,
      mobile: phone,
    };
    service.post(default_url + '/user/addUser', body, (status, res) => {
      console.log('res-----', status, res);
      if (status == 200) {
        // if (res.status) {
        Alert.alert('Successfully Registerd');
        navigation.navigate('Login');
        // } else seterr(res.error);
        setLoading(false);
      } else {
        seterr('Network err!');
      }
    });
  };

  function _checkRefId(_id) {
    if(!_id)return
    setLoading(true);
    service.get(default_url + '/user/getStaff/' + _id, (status, res) => {
      console.log(status, res);
      if (status == 200) {
        if (res.length > 0) setRefId({isValid: true, staff: res[0]});
        else setRefId({isValid: false, staff: null});
        setLoading(false);
        seterr('');
      }
      setLoading(false);
    });
  }

  function _isUserExists(_email) {
    setLoading(true);
    service.get(default_url + '/user/isUserExists/' + _email, (status, res) => {
      console.log(status, res);
      if (res.status == true) {
        if (res.isUserExists) {
          seterr('Email already exist');
        } else {
          setEmail(_email);
          seterr();
        }
        setLoading(false);
      }
      setLoading(false);
    });
  }

  console.log("----->", refId);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={''} />
      {/* <Text style={{color: 'tomato'}}>Referrel Id</Text> */}

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Referrel ID"
          placeholderTextColor="#444444"
          onChangeText={id => _checkRefId(id)}
        />
      </View>
      {refId.staff != null ? (
        <Text
          style={{
            ...fonts.reg_font,
            alignSelf: 'flex-start',
            color: 'green',
            marginLeft: '10%',
            marginBottom: 5,
          }}>
          {/* Staff Name : {refId.staff.fullname} */}
          Referrel id available.
        </Text>
      ) : (
        <Text style={{...fonts.reg_font, color: 'red'}}>No ref id fond</Text>
      )}
      {refId.isValid && (
        <>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Username"
              placeholderTextColor="#444444"
              onChangeText={val => setUsename(val)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Full Name"
              placeholderTextColor="#444444"
              onChangeText={val => setFullname(val)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="#444444"
              secureTextEntry={true}
              onChangeText={val => setPassword(val)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Confirm Password"
              placeholderTextColor="#444444"
              secureTextEntry={true}
              onChangeText={val => setConfirmPassword(val)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Email"
              placeholderTextColor="#444444"
              // secureTextEntry={true}
              // onChangeText={val => setEmail(val)}
              onChangeText={val => _isUserExists(val)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Phone number"
              placeholderTextColor="#444444"
              onChangeText={val => setPhone(val)}
            />
          </View>
        </>
      )}

      <Text style={{color: 'tomato', marginBottom: 10}}>{err}</Text>

      <TouchableOpacity style={styles.loginBtn} onPress={submit}>
        {!loading ? (
          <Text style={styles.loginText}>Submit</Text>
        ) : (
          <ActivityIndicator color="#fff" loading={true} />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={{marginTop: 20}}
        onPress={() => nav.navigate('Login')}>
        <Text style={styles.forgot_button}>Already have an account?</Text>
      </TouchableOpacity>

      {/* TERMS & CONDITIONS */}
      <Modal
        modalVisible={modalVisible}
        setModalVisible={() => nav.navigate('Login')}
        footer={
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity
              style={styles.buttonModal}
              onPress={async () => {
                await Linking.openURL(
                  'https://doc-hosting.flycricket.io/espera-terms-of-use/332b0563-2bed-4793-a08d-3c3e4ebcc21e/terms',
                );
              }}>
              <Text style={{color: 'blue'}}>Download</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonModal}
              onPress={() => nav.navigate('Login')}>
              <Text style={{color: 'blue'}}>Decline</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}
              style={[styles.buttonModal, {backgroundColor: 'blue'}]}>
              <Text style={{color: '#fff'}}>Accept</Text>
            </TouchableOpacity>
          </View>
        }>
        <TandC />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: colors.primary + '20',
    // borderRadius: 30,
    width: '80%',
    height: 45,
    marginBottom: 15,
  },

  TextInput: {
    height: 50,
    padding: 10,
    color: '#000',
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
    color: '#000',
  },

  loginBtn: {
    width: '80%',
    // borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  loginText: {
    color: '#fff',
  },
  buttonModal: {
    width: '30%',
    borderRadius: 25,
    borderColor: 'blue',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    padding: 10,
  },
});
