import React, {Component} from 'react'
import ReactMapGl, {Marker} from 'react-map-gl'
import {connect} from 'react-redux'
import 'mapbox-gl/dist/mapbox-gl.css'
import {LocationPin} from '../components/SVG/Icons'
import LanguageColor from '../util/languageColor'
import {Link} from 'react-router-dom'
export class MapContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewPort: {
        latitude: 40.6501038,
        longitude: -73.9495823,
        width: '100%',
        height: '100%',
        zoom: 9
      }
    }
  }

  componentDidUpdate(prewProps) {
    if (prewProps.selectedLocation !== this.props.selectedLocation) {
      this.setState({
        viewPort: {
          latitude: Number(this.getLocation(this.props.selectedLocation, 1)),
          longitude: Number(this.getLocation(this.props.selectedLocation)),
          width: '100%',
          height: '100%',
          zoom: 15
        }
      })
    }
  }

  render() {
    return (
      <ReactMapGl
        {...this.state.viewPort}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={viewPort => this.setState({viewPort})}
      >
        {this.props.locations.map(location => {
          return (
            <Marker
              key={location.id}
              longitude={this.getLocation(location.address)}
              latitude={this.getLocation(location.address, 1)}
            >
              <Link
                to={
                  this.props.isLoggedIn
                    ? `/event-page/${location.id}`
                    : '/login'
                }
              >
                <LocationPin
                  size="25"
                  color={LanguageColor(location.language)}
                />
              </Link>
            </Marker>
          )
        })}
      </ReactMapGl>
    )
  }

  getLocation = (location, position) => {
    if (location) {
      const locations = location.split(' ')
      let lat = Number(locations[0])
      let lon = Number(locations[1])
      if (position) return lat
      return lon
    }
  }
}

const mapStateToProps = store => {
  return {
    selectedLocation: store.host.location,
    isLoggedIn: !!store.user.id
  }
}

export default connect(mapStateToProps)(MapContainer)
