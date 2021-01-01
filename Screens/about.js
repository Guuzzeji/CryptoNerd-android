import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, BackHandler, Image } from 'react-native';
import { SimpleAnimation } from 'react-native-simple-animations'

function About({navigation}) {
    BackHandler.addEventListener('hardwareBackPress', function(){
        navigation.navigate('Home')
        return true
    })
    return (
        <View>
            <StatusBar translucent backgroundColor="#fff" barStyle="dark-content"/>
            <View style={{paddingTop:50}}>
                <TouchableOpacity style={{justifyContent:'flex-start'}} onPress={function(){navigation.navigate('Home')}}>
                    <Text style={{color:'#fc5c9c', fontSize:18, paddingLeft:10}}>Back</Text>
                </TouchableOpacity>
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <Text style={{fontSize:20, justifyContent:'center'}}>About</Text>
            </View>
            </View>
            <View style={styles.container}>
            <SimpleAnimation aim='in'  movementType='spring' staticType='zoom' fade={true}> 
                <View style={styles.info_box}>
                    <Text style={{alignSelf:'center'}}>Power by https://min-api.cryptocompare.com</Text>
                    <View style={styles.image_outer}>
                        <Image source={require('../img/user_dev.jpg')} style={styles.image}/>
                        <Text style={{alignSelf:'center', paddingTop:10}}>Created by [Asian Nerd Software]</Text>
                    </View>
                    <Text style={{alignSelf:'center'}}>v1.0.0</Text>
                </View>
            </SimpleAnimation>
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
        height: '100%',
        alignItems:'center',
        alignContent:'center'
    },

    image:{
        width:300,
        height:300,
        borderWidth:1,
        borderRadius:20,
    },

    image_outer:{
        padding:10
    },

    info_box: {
        backgroundColor:'#fff',
        borderWidth:1,
        borderRadius:10,
        padding:10,
        borderColor: '#fff',
        elevation:20,
        height:410,
        alignItems:'center'
    }
});

module.exports = About