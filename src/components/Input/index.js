import React from "react";

function Input(props) {
    return (
        <div className="form-group">
          <input
            type={props.type}
            class="form-control border border-gray"
            placeholder={props.placeholder}
          />
        </div>
    )
}

export default Input;