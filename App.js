import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { API_KEY } from './utils/WeatherAPIKey';
import Weather from './components/Weather';


export default class App extends React.Component {
  state = {
    isLoading: true,
    temperature: 0,
    weatherCondition: null,
    error: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: 'Error Getting Weather Condtions'
        });
      }
    );
  }

  fetchWeather(lat = 25, lon = 25) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`)
      .then(res => res.json())
      .then(json => {
        // console.log(json.main.temp);
        // console.log(typeof json.weather[0].main);
        this.setState({
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          isLoading: false
        });
      });
  }

  render() {
    const { isLoading } = this.state;
    console.log(this.state.weatherCondition);
    return (
      <View style={styles.container}>
        {/* {isLoading ? (<Text>Fetching The Weather</Text>) : <Weather weather={weatherCondition} temperature={temperature} />} */}
        {isLoading ? (<ActivityIndicator size="large" color="#222222" />) : (<Weather weather={this.state.weatherCondition} temperature={this.state.temperature} />)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  }
});
