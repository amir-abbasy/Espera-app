
import { View, Text } from 'react-native'
import React from 'react'

function SkeltonHome() {
  return (
    <View>
        <View style={{backgroundColor: '#44444420', width: '100%', height: 350, paddingLeft: 20 }}>
        <View style={{backgroundColor: '#44444420', width: '70%', height: 70, marginTop: 200}} />
        <View style={{backgroundColor: '#44444420', width: '80%', height: 30, marginTop: 10}} />
        </View>
        <View style={{flexDirection: 'row', marginTop: 30}}>
        {new Array(3).fill("*").map(()=>{
            return <View style={{backgroundColor: '#44444420', width: 100, height: 120, borderRadius: 10, marginLeft: 20}} />
        })}
        </View>

        <View style={{}}>
        {new Array(3).fill("*").map(()=>{
            return <View style={{backgroundColor: '#44444420', width: '87%', height: 180, marginTop: 40, borderRadius: 10, marginLeft: 20}} />
        })}
        </View>
    </View>
  )
}


export default SkeltonHome;
