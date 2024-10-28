import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';


const topSites = [
  { id: '1', name: 'Google', url: 'https://www.google.com' },
  { id: '2', name: 'YouTube', url: 'https://www.youtube.com' },
  { id: '3', name: 'GitHub', url: 'https://www.github.com' },
  { id: '4', name: 'Facebook', url: 'https://www.facebook.com' },
];

const App = () => {
  const [news, setNews] = useState([]);
  const apiKey = 'YOUR_NEWS_API_KEY';  // Replace with your A

  // Fetch news from API
  useEffect(() => {
    axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`)
      .then(response => {
        setNews(response.data.articles);
      })
      .catch(error => {
        console.error('Error fetching news:', error);
      });
  }, []);

  // Render Top Sites
  const renderTopSite = ({ item }) => (
    <TouchableOpacity onPress={() => Linking.openURL(item.url)} style={styles.topSite}>
      <Text style={styles.topSiteText}>{item.name}</Text>
    </TouchableOpacity>
  );

  // Render News Feed
  const renderNewsItem = ({ item }) => (
    <View style={styles.newsItem}>
      <Text style={styles.newsTitle}>{item.title}</Text>
      <Text style={styles.newsDescription}>{item.description}</Text>
      <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
        <Text style={styles.readMore}>Read more</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Top Sites Section */}
      <Text style={styles.sectionTitle}>Top Sites</Text>
      <FlatList
        data={topSites}
        renderItem={renderTopSite}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.topSitesContainer}
      />

      {/* News Feed Section */}
      <Text style={styles.sectionTitle}>Personalized News Feed</Text>
      <FlatList
        data={news}
        renderItem={renderNewsItem}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}  // Disable FlatList scrolling (use ScrollView's scrolling)
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  topSitesContainer: {
    marginBottom: 20,
  },
  topSite: {
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    marginRight: 10,
  },
  topSiteText: {
    fontSize: 16,
    fontWeight: '600',
  },
  newsItem: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  newsDescription: {
    fontSize: 14,
    color: '#555',
  },
  readMore: {
    color: '#007BFF',
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default App;
