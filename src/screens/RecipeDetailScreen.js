import { StyleSheet, Text, View, ScrollView, StatusBar, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import color from '../constants/color';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
export default function RecipeDetailScreen(props) {
  let item = props.route.params;
  const [isFavourite,setIsFavourite]=useState(false);
  const navigation =useNavigation();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
      style={{ backgroundColor: color.grey, flex: 1 }}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={color.orange}
      />
      <View style={styles.container}>
        <Image
          source={{ uri: item.strMealThumb }}
          style={styles.img} 
        />
      </View>
      {/*Button*/ }
      <View style={styles.bt}>
        <TouchableOpacity 
        onPress={()=>navigation.goBack()}
        style={styles.bta}>
            <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" ></ChevronLeftIcon>
        </TouchableOpacity>
        <TouchableOpacity 
            onPress={()=>setIsFavourite(!isFavourite)}
            style={styles.btb}>
            <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavourite?"red":"gray"} ></HeartIcon>
        </TouchableOpacity>
      </View>
      <View>
          <Text style={{padding:20,fontWeight:"bold"}}> TÓM TẮT VỀ MÓN ĂN</Text>
      </View>
      <View>
          <Text style={{padding:20,fontWeight:'500'}}> Nội dung: ...</Text>
      </View>
      <View>
          <Text style={{padding:20,fontWeight:'500'}}> Công thức: ...</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  img:{
   
    width: hp(50), 
    height: hp(50),
    borderRadius: 50,
    borderBottomLeftRadius:40, 
    borderBottomRightRadius:40,
    marginTop:3,

  },
  bt:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingTop:14,
    position: 'absolute',
  },
  bta: {
    padding:2,
    borderRadius:1000,
    marginLeft:5,
    backgroundColor:color.grey,
  },
  btb: {
    padding:2,
    borderRadius:1000,
    marginRight:5,
    backgroundColor:color.grey,
    justifyContent:'center',
    alignItems:'center',
  },
});
