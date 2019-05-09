import React from "react";

const cellStyle = {
  display: "block",
  backgroundColor: "white",
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
      content: props.content,
      isHover: props.isHover,
      onClickFunc: props.onClickFunc,
      sideSize: props.sideSize
    };
  }

  // getDerivedStateFromProps is called before every render,
  // use it to infer new state values from props or state changes.
  static getDerivedStateFromProps(props, state) {
    state.content = props.content;
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
      <div style={{...cellStyle, backgroundColor: this.getColor(), width: (600/this.state.sideSize) + "px", height: (600/this.state.sideSize) + "px"}}
        onMouseOut={ this.onOut } onMouseOver={ this.onHover }
        onClick={ this.state.onClickFunc }>
        { this.state.content }
      </div>
    );
  }
}

export default Cell;
