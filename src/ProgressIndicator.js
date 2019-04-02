import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Circle = styled.div`
  background: ${props => (props.correct ? "#82AF88" : "#C6544E")}
  border-radius: 50%;
  height: 15px;
  width: 15px;
  z-index: 1;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Line = styled.div`
  border-top: 2px solid #7b7a7a;
  position: relative;
  top: -9px;
`;

const Outer = styled.div`
  margin: 30px;
`;

class ProgressIndicator extends React.Component {
  render() {
    return (
      <Outer>
        <FlexContainer>
          {new Array(this.props.total).fill(1).map((n, i) => (
            <Circle key={i} correct={this.props.correct[i]} />
          ))}
        </FlexContainer>
        <Line />
      </Outer>
    );
  }

  static propTypes = {
    correct: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired
  };
}

export default ProgressIndicator;
