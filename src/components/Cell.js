import React from "react";

const cellStyle = {
  display: "block",
  backgroundColor: "white",
  width: "200px",
  height: "200px",
  border: "1px solid #333",
  outline: "none",
  textAlign: "center",
  lineHeight: "200px",
  cursor: "pointer"
};

class Cell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "?",
      isHover: false    
    };
  }

  // getDerivedStateFromProps is called before every render,
  // use it to infer new state values from props or state changes.
  static getDerivedStateFromProps(props, state) {
    return state;
  }

  onHover = () => {
    this.setState({
      isHover: true
    });
  }

  onOut = () => {
    this.setState({
      isHover: false
    });
  }

  getColor = () => {
    if (this.state.isHover)
      return "red";
    return "white";
  }

  render() {
    return (
      <div style={{...cellStyle, backgroundColor: this.getColor()}}
        onMouseOut={ this.onOut } onMouseOver={ this.onHover }>
        { this.state.content }
      </div>
    );
  }
}

export default Cell;
