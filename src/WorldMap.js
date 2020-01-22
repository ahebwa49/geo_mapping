import React from "react";
import * as d3 from "d3";

const margin = 75;
const width = 1920 - margin;
const height = 1080 - margin;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    function draw(geo_data) {
      const svg = d3
        .select(this.refs.chart)
        .append("svg")
        .attr("width", width + margin)
        .attr("height", height + margin)
        .append("g")
        .attr("class", "map");

      // debugger;
      const projection = d3.geoMercator();

      const path = d3.geoPath().projection(projection);

      // debugger;

      const map = svg
        .selectAll("path")
        .data(geo_data.features)
        .enter()
        .append("path")
        .attr("d", path);
    }

    // d3.json("world_countries.json", draw);
  }
  render() {
    const styles = {
      container: {
        display: "grid",
        justifyItems: "center"
      }
    };

    return (
      <div ref="chart" style={styles.container}>
        <h1 style={{ textAlign: "center" }}>Hi, I'm the geo chart :)</h1>
      </div>
    );
  }
}

export default App;
