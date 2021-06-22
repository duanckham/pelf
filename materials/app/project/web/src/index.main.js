import React from 'react';

export default class IndexMainComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`main-component ${ISMOBILE}`}>
        {this.props.children}
      </div>
    );
  }
}
