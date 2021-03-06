import React, { Component } from 'react';
import Forecast from '../components/Forecast';
import { getForcast } from '../helpers/api';


class ForecastContainer extends Component {

  constructor() {
    super()
    this.state = {
      isLoading: true,
      forecastData: {}
    }
  }
  componentDidMount() {
    this.makeRequest(this.props.routeParams.city)
  }
  componentWillReceiveProps(nextProps) {
    this.makeRequest(nextProps.routeParams.city)
  }
  makeRequest(city) {
    getForcast(city)
      .then(function (forecastData) {
        this.setState({
          isLoading: false,
          forecastData: forecastData
        });
      }.bind(this));
  }
  handleClick(weather) {
    this.context.router.push({
      pathname: '/detail/' + this.props.routeParams.city,
      state: {
        weather: weather
      }
    })
  }
  render() {
    return (
      <Forecast
        city={this.props.routeParams.city}
        isLoading={this.state.isLoading}
        handleClick={(weather) => this.handleClick(weather)}
        forecastData={this.state.forecastData} />
    )
  }
}

ForecastContainer.contextTypes = {
    router: React.PropTypes.object.isRequired
  }

export default ForecastContainer;