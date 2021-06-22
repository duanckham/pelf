import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainComponent from 'src/index.main';
import HeadComponent from 'src/index.head';
import FootComponent from 'src/index.foot';
import PageDefaultComponent from 'src/pages/default';

class IndexComponent extends React.Component {
  constructor(props) {
    super(props);

    this.history;
    this.renderRoute = this.renderRoute.bind(this);
    this.renderComponent = this.renderComponent.bind(this);
    this.loading = this.loading.bind(this);

    this.state = {
      status: false,
    };
  }

  loading(tof) {
    this.main.loading(tof);
  }

  parseQuery(qstr) {
    let query = {};
    let a = (qstr[0] === '?' ? qstr.substr(1) : qstr).split('&');

    for (let i = 0; i < a.length; i++) {
      let b = a[i].split('=');
      query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
    }

    return query;
  }

  renderRoute({ history }) {
    this.history = history;

    return (
      <div>
        <HeadComponent />
        <MainComponent ref={com => { this.main = com; }} history={history}>
          <Switch>
            <Route path="/" component={this.renderComponent(PageDefaultComponent)} />
          </Switch>
        </MainComponent>
        <FootComponent />
      </div>
    );
  }

  renderComponent(Com) {
    return (req) => {
      let request = $.extend({ query: this.parseQuery(req.location.search) }, req);
      return <Com request={request} history={this.history} loading={this.loading} />;
    };
  }

  render() {
    return (
      <BrowserRouter>
        <Route render={this.renderRoute} />
      </BrowserRouter>
    );
  }
}

export default IndexComponent;
