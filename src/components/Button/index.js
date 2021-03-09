import React from "react";

function Button(props) {
  return (
    <button type="submit" class="btn btn-choco btn-block">
      { props.name }
    </button>
  );
}

export default Button;
