import React from 'react';
import reactMixin from 'react-mixin';
import tuntuMixin from 'tuntu';

export default class IndexFootComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div className={`foot-component${ISMOBILE ? '-of-mobile' : ''}`}>

      </div>
    );
  }
}

reactMixin(IndexFootComponent.prototype, tuntuMixin);