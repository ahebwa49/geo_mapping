import React from "react";
import WorldMap from "./WorldMap";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        geoData: null,
        cupData: null
      }
    };
  }
  componentDidMount() {
    Promise.all([
      fetch(
        "https://raw.githubusercontent.com/ahebwa49/geo_mapping/master/src/world_countries.json"
      ),
      fetch(
        "https://raw.githubusercontent.com/ahebwa49/geo_mapping/master/src/world_cup_geo.json"
      )
    ])
      .then(responses => Promise.all(responses.map(resp => resp.json())))
      .then(([geoData, cupData]) => {
        // console.log(geoData);
        console.log(cupData);
        this.setState({
          data: {
            geoData: geoData,
            cupData: cupData
          }
        });
      })
      .catch(error => console.log(error));
  }
  render() {
    const { data } = this.state;
    return <div>{data.geoData && <WorldMap data={data} />}</div>;
  }
}
export default App;
