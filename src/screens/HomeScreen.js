import { View, Text, ScrollView, Image, StatusBar, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import color from '../constants/color';
import { BellIcon, MagnifyingGlassIcon, XMarkIcon } from 'react-native-heroicons/outline';
import Categories from '../components/categories';
import axios from 'axios';
import Recipes from '../components/recipes';

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  const handleChangeCategory = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  };

  const getCategories = async () => {
    try {
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (err) {
      console.log('Lỗi: ', err.message);
    }
  };

  const getRecipes = async (category = "Beef") => {
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (err) {
      console.log('Lỗi: ', err.message);
    }
  };

  // Filter meals based on search query
  const filteredMeals = meals.filter(meal =>
    meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search query change
  const handleSearchChange = (text) => {
    setSearchQuery(text);
    if (text.length === 0) {
      setErrorMessage(''); // Reset error message if search is empty
    } else if (filteredMeals.length === 0) {
      setErrorMessage('Không tìm thấy món ăn nào!'); // Set error message if no results
    } else {
      setErrorMessage(''); // Clear error message if results are found
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={color.orange} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        style={{ margin: 5, paddingTop: 5 }}
      >
        <View style={styles.img}>
          <Image source={require('../../assets/Images/avatar.png')} style={{ height: hp(5), width: hp(5.5), borderRadius: 1000 }} />
          <BellIcon size={hp(4)} color={color.greytext} />
        </View>

        <View>
          <Text style={{ fontSize: hp(1.7), marginLeft: 10, color: color.greytext }}>Xin chao! Nam!</Text>
          <View>
            <Text style={styles.textTop}>Các Món Ăn Ngon</Text>
          </View>
        </View>

        {/* Thanh tìm kiếm */}
        <View style={styles.center}>
          <TextInput
            placeholder='Tìm món ăn'
            placeholderTextColor={color.greytext}
            style={styles.search}
            value={searchQuery}
            onChangeText={handleSearchChange} // Handle search change
          />
          <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.iconContainer}>
            <XMarkIcon size={hp(2.5)} strokeWidth={3} color="gray" />
          </TouchableOpacity>
          <View style={styles.iconContainer}>
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
          </View>
        </View>

        {/* categories */}
        <View>
          {categories.length > 0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />}
        </View>

        {/* recipes */}
        <View>
          {filteredMeals.length > 0 ? (
            <Recipes meals={filteredMeals} categories={categories} />
          ) : (
            <Text style={styles.noResults}>{errorMessage}</Text> // Display error message
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  img: {
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  textTop: {
    fontSize: hp(3.8),
    color: color.greytext,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  center: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: color.grey,
    padding: 6,
    borderWidth: 2,
    borderColor: color.orange,
    borderRadius: 1000,
  },
  search: {
    fontSize: hp(1.7),
    flex: 1,
    marginBottom: 1,
    letterSpacing: 0.5,
    marginLeft: 5,
  },
  iconContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    marginLeft: 5,
  },
  noResults: {
    textAlign: 'center',
    fontSize: hp(2),
    color: color.greytext,
    marginTop: 20,
  },
});
