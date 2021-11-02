import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from 'components/home';

export class Router extends React.Component {
  constructor(props) {
    super(props);

    this.history;
    this.renderRoute = this.renderRoute.bind(this);
    this.renderComponent = this.renderComponent.bind(this);
  }

  parseQuery(query) {
    const r = {};
    const s = (query[0] === '?' ? query.substr(1) : query).split('&');

    for (let i = 0; i < s.length; i++) {
      const [key, value] = s[i].split('=');

      r[decodeURIComponent(key)] = decodeURIComponent(value || '');
    }

    return r;
  }

  renderRoute({ history }) {
    this.history = history;

    return (
      <Switch>
        <Route path='/' component={this.renderComponent(Home)} />
      </Switch>
    );
  }

  renderComponent(Component) {
    return (req) => {
      return <Component
        request={$.extend({ query: this.parseQuery(req.location.search) }, req)}
        history={this.history}
        loading={this.loading}
      />;
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