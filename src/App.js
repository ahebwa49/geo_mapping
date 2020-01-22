import React from "react";
import WorldMap from "./WorldMap";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      geoData: null
    };
  }
  componentDidMount() {
    fetch(
      "https://raw.githubusercontent.com/ahebwa49/geo_mapping/master/src/world_countries.json"
    )
      .then(response => response.json())
      .then(data =>
        this.setState({
          geoData: data
        })
      )
      .catch(error => console.log(error));
  }
  render() {
    const { geoData } = this.state;
    return <div>{geoData && <WorldMap data={geoData} />}</div>;
  }
}
export default App;
