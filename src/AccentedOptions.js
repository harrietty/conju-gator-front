import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Div = styled.div`
  text-align: center;
`;

const Button = styled.button`
  background: whitesmoke;
  padding: 5px 8px;
  border-radius: 4px;
  margin: 5px;
  cursor: pointer;
  display: inline;
  &:hover {
    background: white;
  }
`;

const AccentedOptions = ({ handleAccentSelection }) => (
  <Div>
    {["á", "é", "í", "ó", "ú", "ñ", "ü"].map(opt => (
      <Button
        type="button"
        className="accentSelect"
        key={opt}
        onClick={handleAccentSelection}
      >
        {opt}
      </Button>
    ))}
  </Div>
);

AccentedOptions.propTypes = {
  handleAccentSelection: PropTypes.func.isRequired
};

export default AccentedOptions;
