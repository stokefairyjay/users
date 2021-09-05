import React, { PureComponent } from "react";

class Spinner extends PureComponent {
  render() {
    return (
      <div className="spinner-border mt-4" role="status">
        <span className="sr-only"></span>
      </div>
    );
  }
}

export default Spinner;
