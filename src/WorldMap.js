import React from "react";
import * as d3 from "d3";

const margin = 75;
const width = 1200 - margin;
const height = 650 - margin;

class WorldMap extends React.Component {
  componentDidMount() {
    const { data } = this.props;

    const svg = d3
      .select(this.refs.chart)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("class", "map");

    const projection = d3
      .geoMercator()
      .scale(130)
      .translate([width / 2, height / 1.4]);

    const path = d3.geoPath().projection(projection);

    const map = svg
      .selectAll("path")
      .data(data.geoData.features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("fill", "rgb(9, 157, 217)")
      .style("stroke", "black")
      .style("stroke-width", 0.5);

    const nested = d3
      .nest()
      .key(d => d.year)
      .rollup(leaves => {
        const total = d3.sum(leaves, d => d.attendance);

        const coords = leaves.map(d => projection([+d.long, +d.lat]));

        const center_x = d3.mean(coords, d => d[0]);

        const center_y = d3.mean(coords, d => d[1]);

        return {
          attendance: total,
          x: center_x,
          y: center_y
        };
      })
      .entries(data.cupData);

    const attendance_extent = d3.extent(nested, d => d.value["attendance"]);

    const rScale = d3
      .scaleSqrt()
      .domain(attendance_extent)
      .range([0, 8]);

    console.log(nested);

    svg
      .append("g")
      .attr("class", "bubble")
      .selectAll("circle")
      .data(
        nested.sort(function(a, b) {
          return b.value["attendance"] - a.value["attendance"];
        })
      )
      .enter()
      .append("circle")
      .attr("fill", "rgb(247, 148, 42)")
      .attr("cx", d => d.value["x"])
      .attr("cy", d => d.value["y"])
      .attr("r", d => rScale(d.value["attendance"]))
      .attr("stroke", "black")
      .attr("stroke-width", 0.7)
      .attr("opacity", 0.7);
  }

  render() {
    const { data } = this.props;

    const styles = {
      container: {
        display: "grid",
        justifyItems: "center"
      }
    };

    return (
      <div ref="chart" style={styles.container}>
        {data ? (
          <p style={{ textAlign: "center" }}>Hi, I'm the geo chart :)</p>
        ) : (
          <p>loading ...</p>
        )}
      </div>
    );
  }
}

export default WorldMap;
