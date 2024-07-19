import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import Card from '../components/Card'; // Adjust the import path according to your project structure
import MiniHeader from '../components/MiniHeader';
import { StatusBar } from 'expo-status-bar';

const FeedsScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('https://newsapi.org/v2/everything?q=stigma&apiKey=c5db66e564f2437ab0fd41315494586f');
        const jsonData = await response.json();
        // console.log('Fetched data:', jsonData); // Log the fetched data
        setData(jsonData.articles);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
     <StatusBar backgroundColor="#FFFFFF" />
      <View>
          <MiniHeader />
        </View>
      {loading ? (
        <ActivityIndicator size="large" color="#e53935" style={styles.loader} />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => <Card item={item} />}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // White background
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#e53935', // Red color
  },
  subText: {
    fontSize: 18,
    color: '#333', // Black color
    marginTop: 10,
  },
  loader: {
    marginTop: 50,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

export default FeedsScreen;
