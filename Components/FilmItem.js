import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { getImageFromApi } from '../Api/TMDBApi'
import { TouchableOpacity } from 'react-native-gesture-handler'

import FadeIn from '../Animations/FadeIn'


class FilmItem extends React.Component {



  _displayFavoriteImage() {
    if (this.props.isFavorite) {
      return(
        <Image
          style={styles.favorite_image}
          source={require('../Images/ic_favorite.png')}
        />
      )    
    }
  }

  render() {
    const {film, displayDetailForFilm} = this.props
    return (
      <FadeIn>
        <TouchableOpacity 
        style={styles.main_container}
        onPress={() => displayDetailForFilm(film.id)}>
          <Image
                    style={styles.imageFilm_image}
                    source={{uri: getImageFromApi(film.poster_path)}}
                  />
            <View style={styles.content_container}>
              <View style={styles.header_container}>
                {this._displayFavoriteImage()}
                <Text style={styles.title_text}>{film.title}</Text>
                <Text style={styles.vote_text}>{film.vote_average}</Text>
              </View>
              <View style={styles.description_container}>
                <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
              </View>
              <View style={styles.date_container}>
                <Text style={styles.date_text}>Sortie le {film.release_date}</Text>
              </View>
            </View>
        </TouchableOpacity>
      </FadeIn>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: 'row',
  },
  imageFilm_image: {
    flex: 1,
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: '#666666'
  },
  content_container: {
    flex: 1,
    margin: 5,
  },
  header_container: {
    flex: 3,
    flexDirection: 'row'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap', //Permet de passer à la ligne si le texte est trop long
    paddingRight: 5
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666'
  },
  description_container: {
    flex: 7,
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
  date_container: {
    flex: 1,
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14,
  },
  favorite_image: {
    height: 20,
    width: 20,
    marginRight: 5
  }
})

export default FilmItem
