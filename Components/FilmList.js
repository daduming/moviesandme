import React from 'react'

import { StyleSheet, View, Button, TextInput,Text, FlatList} from 'react-native'
import { connect } from 'react-redux'

import FilmItem from './FilmItem'


class FilmList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          films: [],
        };
      }
    

      _displayDetailForFilm = (idFilm) => {
        this.props.navigation.navigate("FilmDetail", {idFilm : idFilm})
      }
  render() {
    return (
        <FlatList
        style={styles.list}
        data={this.props.films}
        keyExtractor={(item) => item.id.toString()}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if(!this.props.favoriteList && this.props.page < this.props.totalPages ){
            this.props.loadFilms()       
        }}}
        extraData={this.props.filmsFavorites}
        renderItem={({item}) => <FilmItem film={item} 
        isFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
        displayDetailForFilm={this._displayDetailForFilm}/>}
      />
    )
  }
}

const styles = StyleSheet.create({
    list: {
    flex: 1
  }
})

const mapStateToProps = (state) => {
    return {
      favoritesFilm: state.toggleFavorite.favoritesFilm
    }
  } 
  
  export default connect(mapStateToProps)(FilmList) 