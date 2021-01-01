import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, FlatList, SafeAreaView } from 'react-native';
import { SimpleAnimation } from 'react-native-simple-animations'
let fetch = require('node-fetch')

let all_coins = require('../Data/coin.json')//list of coins to fetch
let new_coin_data = []//id of all_coin items for list

//create id func
function rand(){
    let save = ''
    for(let x = 0; x < 20; x++){
        let r = Math.floor(Math.random()*10)
        save += r
    }
    return save
}

//id data for list
for(let x = 0; x < all_coins.length; x++){
    all_coins[x]["id"] = rand()
    new_coin_data.push(all_coins[x])
}

//on start display var
let coin_null = {
    coin: 'Bitcoin',
    short : 'BTC',
    data : {
        PRICE : '',
        LASTUPDATE : '',
        HIGH24HOUR : '',
        LOW24HOUR : '',
        CHANGE24HOUR : '',
        CHANGEPCT24HOUR : 0
    }
}

function Home({navigation}) {
    const [coin_data, set_coin] = useState(coin_null)//display data
    const [pick_coin, set_pick_coin] = useState(new_coin_data[0])//coin to fetch

    //func when click on coin from list
    function btn_get_data(coin){
        fetch('https://min-api.cryptocompare.com/data/generateAvg?fsym='+ coin.sys +'&tsym=USD&e=Kraken', {method: 'GET'}).then(function(response){
        return response.json()
    }).then(function(data){
        //console.log(data.DISPLAY)
        let a = {
            "coin" : coin.Name,
            "short" : coin.sys,
            "data" : data.DISPLAY
        }
        //console.log(a)
        set_coin(a)
    })
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="#fff" barStyle="dark-content"/>
            <View style={{paddingTop:10}}>
            <View style={styles.info_box}>
                <SimpleAnimation aim='in' animateOnUpdate={true} movementType='spring' staticType='zoom' fade={true}>
                    <View style={{flexDirection:'row', paddingBottom:4, justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.text_t}>{coin_data.coin}</Text>
                            <Text>[{coin_data.short}]</Text>
                        </View>
                        <View>
                            <Text style={styles.text_t}>Price: {coin_data.data.PRICE}</Text>
                        </View>
                    </View>
                    <Text style={{paddingBottom:4}}>Updated by Server: {coin_data.data.LASTUPDATE}</Text>
                    <View style={{flexDirection:'row', paddingBottom:4}}>
                        <Text style={{paddingRight:10, color:'#2DD300'}}>High 24hr: {coin_data.data.HIGH24HOUR}</Text>
                        <Text style={{color: '#DF0101'}}>Low 24hr: {coin_data.data.LOW24HOUR}</Text>
                    </View>
                    <View style={{flexDirection:'row', paddingBottom:10}}>
                        <Text style={{paddingRight:10}}>Change 24hr: {coin_data.data.CHANGE24HOUR}</Text>
                        <Text>Change 24hr PCT: {Math.floor(coin_data.data.CHANGEPCT24HOUR*100) + '%'}</Text>
                    </View>
                </SimpleAnimation>
                <View style={styles.btn_outer}>
                    <TouchableOpacity style={styles.btn_core} onPress={function(){btn_get_data(pick_coin)}}>
                        <Text style={styles.btn_text}>Refresh</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={{paddingTop:20}}>
                <Text style={{fontSize:20, paddingLeft:10}}>Coins</Text>
                <View style={{padding:10}}>
                    <SafeAreaView style={{paddingBottom:10, height:'88%'}}>
                        <FlatList 
                        data={new_coin_data}
                        renderItem={function({item}){
                            return (
                            <View style={{paddingBottom:10}}>
                            <TouchableOpacity style={styles.list_item}
                            onPress={function(){
                                //console.log(item)
                                set_pick_coin(item)
                                btn_get_data(item)
                            }}
                            >
                                <Text style={styles.list_txt_main}> {item.Name}</Text>
                                <Text style={styles.list_txt_sec}>[{item.sys}]</Text>
                            </TouchableOpacity>
                            </View>
                            )
                        }}
                        keyExtractor={item => item.id}
                        />
                        <View style={{paddingTop:1}}>
                            <TouchableOpacity style={{alignItems:'center'}}
                            onPress={function(){
                                navigation.navigate('About')
                            }}
                            >
                                <Text style={{fontSize:12, color:'#fc5c9c'}}>About</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop:40,
        paddingRight:10,
        paddingLeft:10,
        width: '100%',
        height: '100%'
    },

    info_box: {
        backgroundColor:'#fff',
        borderWidth:1,
        borderRadius:8,
        padding:10,
        borderColor: '#fff',
        elevation:20
    },

    text_t: {
        fontSize: 20
    },

    btn_core:{
        backgroundColor:'#fc5c9c',
        alignItems:'center',
        borderWidth:1,
        borderRadius:20,
        padding:5,
        borderColor:'#fc5c9c'
    },

    btn_outer:{
        backgroundColor:'#fc5c9c',
        borderWidth:1,
        borderRadius:20,
        borderColor:'#fc5c9c',
        elevation:4
    },

    btn_text:{
        color:'#fff',
        fontSize:15,
        fontWeight:'700'
    },

    list_item:{
        backgroundColor:'#fff',
        flexDirection:'row',
        borderWidth:1,
        padding:5,
        borderRadius:10,
        borderColor:'#B5B5B5',
        elevation:4
    },

    list_txt_main:{
        fontSize:15,
        fontWeight:'600',
        paddingRight:5
    },

    list_txt_sec:{
        fontSize:15,
        fontWeight:'600',
        color:'#6D6D6D'
    }
});

module.exports = Home
