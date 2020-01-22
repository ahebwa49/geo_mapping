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
    fetch(
      "https://raw.githubusercontent.com/ahebwa49/geo_mapping/master/src/world_countries.json"
    )
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));
    //   Promise.all([
    //     fetch(
    //       "https://raw.githubusercontent.com/ahebwa49/geo_mapping/master/src/world_countries.json"
    //     ),
    //     fetch(
    //       "https://raw.githubusercontent.com/ahebwa49/geo_mapping/master/src/world_cup_geo.tsv"
    //     )
    //   ])
    //     .then(responses => Promise.all(responses.map(resp => resp.json())))
    //     .then(([geoData, cupData]) => {
    //       console.log(geoData);
    //       this.setState({
    //         data: {}
    //       });
    //     })
    //     .catch(error => console.log(error));
    // }
  }
  render() {
    const { data } = this.state;
    return <div>{data.geoData && <WorldMap data={data.geoData} />}</div>;
  }
}
export default App;
