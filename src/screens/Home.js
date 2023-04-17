import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  Card,
  CardSoldOut,
  CardWinner,
  CardClosingSoon,
  Header,
  Carousel,
  Currency,
  SkeltonLoading
} from '../components';

import service from '../global/service';
import {default_url} from '../global/constanants';
import {getStore} from '../global/util';
import { useIsFocused } from '@react-navigation/native';

export default function Home() {
  const [contests, setContests] = useState();
  const [soldOuts, setSoldOuts] = useState();
  const [history, setHistory] = useState();

  const [endingSpotes, setEndingSpots] = useState();
  const [curosal, setCurosal] = useState();

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const isFocused = useIsFocused()

  async function getUserName() {
    var user = await getStore('@user');
    setUser(JSON.parse(user).userId);
  }
  useEffect(() => {
    getUserName();

    service.get(default_url + '/data/getCovers', (err, res) => {
      // console.log('-----', res, err);
      setCurosal(res);
      setLoading(false);
    });
  })

  useEffect(() => {
    service.get(default_url + '/contest/getContestsActive', (err, res) => {
      // console.log('---getContestsActive--', res, err);
      setContests(res);
    });

    service.get(default_url + '/contest/getContestsSoldout', (err, res) => {
      // console.log('---getContestsSoldout--', res, err);
      setSoldOuts(res);
    });

    service.get(default_url + '/contest/getHistory', (err, res) => {
      console.log('--getHistory---', res, err);
      setHistory(res);
    });

    service.get(default_url + '/data/getEndingSpots', (err, res) => {
      // console.log('---getEndingSpots--', res, err);
      setEndingSpots(res);
    });
   
  }, [isFocused]);

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <Header homeHeader={true} />

      {!loading ? (
        <ScrollView style={styles.root}  showsVerticalScrollIndicator={false}>
          <Carousel data={curosal} />

          {/* 
        <CardClosingSoon />
        
        <Card />
        <CardSoldOut />
        <CardWinner /> 
        */}

          <Text style={styles.heading}>Closing soon</Text>

          {endingSpotes && (
            <FlatList
              data={endingSpotes}
              renderItem={(_, index) => <CardClosingSoon {..._} />}
              horizontal
              keyExtractor={(_, k) => k.toString()}
              contentContainerStyle={{paddingLeft: 10}}
            />
          )}

          {contests && (
            <FlatList
              data={contests}
              renderItem={(_, index) => <Card {..._} user={user} />}
              keyExtractor={(_, k) => k.toString()}
            />
          )}

          <Text style={styles.heading}>Sold Out</Text>
          {soldOuts && (
            <FlatList
              data={soldOuts}
              renderItem={(_, index) => <CardSoldOut {..._} />}
              keyExtractor={(_, k) => k.toString()}
            />
          )}

          <Text style={styles.heading}>Winners</Text>
          {history && (
            <FlatList
              data={history}
              renderItem={(_, index) => <CardWinner {..._} />}
              keyExtractor={(_, k) => k.toString()}
            />
          )}

          {/* 
        <FlatList
          data={[1, 2, 3, 4, 5]}
          renderItem={(_, index) => <Card {..._} />}
          keyExtractor={(_, k) => k.toString()}
        /> */}
        </ScrollView>
      ) : (
        <SkeltonLoading/>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    // padding: 5
  },
  heading: {
    fontWeight: '900',
    fontSize: 20,
    marginVertical: 10,
    marginLeft: 20,
    marginTop: 30,
    color: '#44444474',
  },
});
