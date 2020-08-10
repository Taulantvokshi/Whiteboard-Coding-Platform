import React, {Component} from 'react'
import ReactMapGl, {Marker} from 'react-map-gl'
import {LocationPin} from '../../components/SVG/Icons'
import languageColor from '../../util/languageColor'
import {REACT_APP_MAPBOX_TOKEN} from '../../../secrets'
export class SingleMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewPort: {
        latitude: 40.6501038,
        longitude: -73.9495823,
        width: '100%',
        height: '100%',
        zoom: 13
      }
    }
  }
  componentDidMount() {
    this.setState({
      viewPort: {
        latitude: Number(this.getLocation(this.props.location, 1)),
        longitude: Number(this.getLocation(this.props.location)),
        width: '100%',
        height: '100%',
        zoom: 12.9
      }
    })
  }
  componentDidUpdate(prewProps) {
    if (prewProps.location !== this.props.location) {
      this.setState({
        viewPort: {
          latitude: Number(this.getLocation(this.props.location, 1)),
          longitude: Number(this.getLocation(this.props.location)),
          width: '100%',
          height: '100%',
          zoom: 12.9
        }
      })
    }
  }

  render() {
    const marker = this.props.location
    const language = this.props.language

    return (
      <ReactMapGl
        {...this.state.viewPort}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={viewPort => this.setState({viewPort})}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker
          longitude={this.getLocation(marker)}
          latitude={this.getLocation(marker, 1)}
        >
          <div className="marker">
            <LocationPin color={languageColor(language)} size="25" />
          </div>
        </Marker>
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

export default SingleMap
