import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { createAppContainer  } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail';
import Favorites from '../Components/Favorites';
import News from '../Components/News';
import Seen from '../Components/Seen';
import Test from '../Components/Test';

const SearchStackNavigator = createStackNavigator({
  Search: { 
    screen: Search,
    navigationOptions: {
      title: 'Rechercher'
    }
  },
  FilmDetail: {
      screen: FilmDetail
  }
})

const FavoritesStackNavigator = createStackNavigator({
  Favorites: { 
    screen: Favorites,
    navigationOptions: {
      title: 'Favoris'
    }
  },
  FilmDetail: {
      screen: FilmDetail
  }
})

const NewsStackNavigator = createStackNavigator({
  Search: { 
    screen: News,
    navigationOptions: {
      title: 'Les derniers films'
    }
  },
  FilmDetail: {
      screen: FilmDetail
  }
})

const SeenStackNavigator = createStackNavigator({
  Seen: {
    screen: Seen,
    navigationOptions: {
      title: 'Mes Films Vus',
    },
  },
  FilmDetail: {
    screen: FilmDetail,
  }
})

const MoviesTabNavigator = createBottomTabNavigator({
  Search: {
    screen: SearchStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
        source={require('../Images/ic_search.png')}
        style={styles.icon}/>
      }
    }
  },
  Favorites: {
    screen: FavoritesStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
        source={require('../Images/ic_favorite.png')}
        style={styles.icon}/>
      }
    }
  },
  News: {
    screen: NewsStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
        source={require('../Images/ic_news.png')}
        style={styles.icon}/>
      }
    }
  },
  Seen: {
    screen: SeenStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
          source={require('../Images/ic_check.png')}
          style={styles.icon}/>
      }
    }
  },
  Test: {
    screen: Test,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
        source={require('../Images/ic_test.png')}
        style={styles.icon}/>
      }
    }
  }
},
{
  tabBarOptions: {
    activeBackgroundColor: '#DDDDDD',
    inactiveBackgroundColor: '#FFFFFF',
    showLabel: false,
    showIcon: true
  }
})

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})

export default createAppContainer(MoviesTabNavigator);
