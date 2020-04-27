import React from 'react'

import { StyleSheet, View, Button, TextInput,Text,
  Keyboard, ActivityIndicator} from 'react-native'
import { connect } from 'react-redux'
import FilmList from './FilmList'
import { getFilmsFromApiWithSearchedText } from '../Api/TMDBApi'

class  Search extends React.Component {

  constructor(props) {
    super(props);
    this.searchedText = ""
    this.page = 0
    this.totalPages = 0
    this.noResult = false
    this.state = {
      films: [],
      isLoading: false,

    };
    this._loadFilms = this._loadFilms.bind(this)
  }

  _searchFilms() {
    this.page = 0
    this.totalPages = 0
    this.noResult = false
    this.setState({
      films: []
    }, () => {
      this._loadFilms()
    })
  }

  _displayLoading() {
      if (this.state.isLoading) {
        return (
          <View style={styles.loading_container}>
            <ActivityIndicator size='large' />
          </View>
        )
      }
  }

  _noResults() {
      if (this.noResult) {
        return (
          <View style={styles.loading_container}>
            <Text>No results</Text>
          </View>
        )
      }
  }

  _searchTextInputChanged(text) {
    this.searchedText = text
  }
  
  _loadFilms() {
    if(this.searchedText.length > 0 ){
      this.setState({isLoading: true});
      getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(data => {
        Keyboard.dismiss();
        this.page = data.page
        this.totalPages = data.total_pages
        if(data.results.length > 0){
          this.noResult = false
          this.setState({
            films: [...this.state.films, ...data.results], //Add new films to old list of film (concatenation)
            isLoading: false,
          });
        } else {
          this.noResult = true
          this.setState({
            films: [...this.state.films, ...data.results], //Add new films to old list of film (concatenation)
            isLoading: false,
          });
        }
      })
    }
  }

  render() {
    return(
      <View style={styles.main_container}>
        <TextInput
          placeholder="Titre du film"
          onChangeText={(text) => this._searchTextInputChanged(text)}
          style={styles.textinput}
          onSubmitEditing={() => this._searchFilms()}
         />
        <Button title="Rechercher" onPress={() => {this._searchFilms()}} style={styles.button}/>
        <FilmList 
        films={this.state.films} 
        navigation={this.props.navigation} 
        loadFilms={this._loadFilms}
        page={this.page}
        totalPages={this.totalPages}
        favoriteList={false}
        />
        {this._displayLoading()}
        {this._noResults()}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5,
  },
    button: {
      height: 50,
    },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = (state) => {
  return {
    favoritesFilm : state.favoritesFilm
  }
} 

export default connect(mapStateToProps)(Search) 