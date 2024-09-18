import { View, Text,ScrollView,Image,StatusBar,StyleSheet, TextInput } from 'react-native'
import React, {useEffect, useState} from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import color from '../constants/color'
import {BellIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import Categories from '../components/categories';
import axios from 'axios';
import Recipes from '../components/recipes';
export default function HomeScreen() {
  const [activeCategory,setActiveCategory]=useState('Beef');
  const [categories,setCategories]=useState([]);
  const [meals,setMeals] = useState([]);
  useEffect(()=>{
    getCategories();
    getRecipes();
  },[])
  const handleChangeCategory = category=>{
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  }
  const getCategories = async ()=>{
    try {
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php')
      console.log('Danh mục: ',response.data);
      if(response && response.data){
        setCategories(response.data.categories);
      }
    } catch (err) {
      console.log('Lỗi: ',err,message);
    }
  }
  const getRecipes = async (category="Beef")=>{
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      //console.log('Danh mục: ',response.data);
      if(response && response.data){
        setMeals(response.data.meals);
      }
    } catch (err) {
      console.log('Lỗi: ',err,message);
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar 
       barStyle="light-content" 
       backgroundColor={color.orange}
      />
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom:50}}
      style={{margin:5, paddingTop:5}}
      >
        <View style={styles.img}>
            <Image source={require('../../assets/Images/avatar.png')} style={{height: hp(5),width: hp(5.5), borderRadius:1000}}></Image>
            <BellIcon size={hp(4)} color={color.greytext}/>
        </View>

        <View>
          <Text style={{fontSize:hp(1.7), marginLeft:10,color:color.greytext}}>Xin chao! Nam!</Text>
          <View>
            <Text style={styles.textTop}>Các Món Ăn Ngon</Text>
          </View>
        </View>
      {/*Thanh tìm kiếm */}
        <View style={styles.center}>
          <TextInput
            placeholder='Tìm món ăn'
            placeholderTextColor={color.greytext}              
            style={styles.search}
          />
          <View style={styles.iconContainer}>
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray"></MagnifyingGlassIcon>
          </View>        
        </View>
     {/*categories */}
        <View>
          {categories.length>0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory}/>}
        </View>
        {/* recipes*/}
        <View>
          <Recipes meals={meals}categories={categories}/>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        
    },
    img:{
        marginLeft:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:10,
        
    },
    textTop:{
      fontSize:hp(3.8),
      color:color.greytext,
      marginLeft:10,
      fontWeight:'bold',
    },
    center:{
      margin:10,
      flexDirection:'row',
      justifyContent:'center',
      backgroundColor:color.black,
      borderRadius: 1000, // rounded-full
      backgroundColor: color.grey, // bg-black
      padding: 6,
      borderWidth:2,
      borderColor:color.orange,
    },
    search:{
      fontSize: hp(1.7),
      flex:1,
      marginBottom:1,
      letterSpacing:0.5,
      marginLeft:5,
    },
    iconContainer: {
      backgroundColor: 'white', // bg-white
      borderRadius: 8,
      justifyContent:'center' // rounded
    },
})