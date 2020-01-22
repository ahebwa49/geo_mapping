import React from "react";
import WorldMap from "./WorldMap";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return (
      <div>
        <WorldMap />
      </div>
    );
  }
}
export default App;
