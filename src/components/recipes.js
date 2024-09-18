import { Pressable, StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import MasonryList from '@react-native-seoul/masonry-list';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { mealData } from '../constants/food';
import color from '../constants/color';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Categories from './categories';
import Loading from './loading';
import { useNavigation } from '@react-navigation/native';

export default function Recipes({categories,meals}) {
    const navigation=useNavigation();
  return (
    <View style={styles.container}>
      <Text> </Text>
      <View>
        {
            categories.length==0||meals.length==0?
            (
                <Loading size="large" style={{marginTop:20}}></Loading>
            ):(
                <MasonryList
                data={meals}
                keyExtractor={(item) => item.idMeal}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({item,i}) => <RecipeCard item={item} index={i} navigation={navigation}/>}
            // refreshing={isLoadingNext}
            // onRefresh={() => refetch({first: ITEM_CNT})}
                onEndReachedThreshold={0.1}
                //onEndReached={() => loadNext(ITEM_CNT)}
                />
            )
            
        }
      </View>
    </View>
  )
}
const RecipeCard = ({item,index,navigation})=>{
    let isEven = index%2==0;
    return(
        <Animated.View entering={FadeInDown.delay(index*100).duration(600).springify().damping(12)}>
            <Pressable
                style={{width:'100%',justifyContent:'center',
                    marginBottom:4,padding:1, paddingLeft: isEven ? 0:8, paddingRight: isEven?8:0}
            }
                onPress={()=>navigation.navigate('RecipeDetail',{...item})}
            >
                <Image 
                    source={{uri: item.strMealThumb}}
                    style={{width:'100%',height:index%3==0?hp(25):hp(35),
                        borderRadius:35}}
                />
                <Text style={{fontSize: hp(1.5),marginLeft:2,color:color.black}}>
                        {
                            item.strMeal.length>20? item.strMeal.slice(0,20)+'...': item.strMeal
                        }
                </Text>
            </Pressable>
        </Animated.View>
    )
}
const styles = StyleSheet.create({
    container:{
        margin:10,
        padding:3,
    },
})