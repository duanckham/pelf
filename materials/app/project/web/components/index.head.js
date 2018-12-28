import React from 'react';
import reactMixin from 'react-mixin';
import tuntuMixin from 'tuntu';

export default class IndexHeadComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div className={`head-component${ISMOBILE ? '-of-mobile' : ''}`}>

      </div>
    );
  }
}

reactMixin(IndexHeadComponent.prototype, tuntuMixin);