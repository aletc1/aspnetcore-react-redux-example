import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Container, Grid, Segment, List } from 'semantic-ui-react';
import { translate, Trans } from 'react-i18next';
import WishListView from './components/wishes';
import { connect } from 'react-redux';
import { ApplicationState } from 'src/stores/store';

class HomeView extends React.Component<RouteComponentProps<{}>, any> {
    public render() {
        const { t } = this.props as any;
        return <Container>
            <h1>Hello, world!</h1>
            <p>Welcome to this ASP.NET Core 2.0 + React 16 + Redux + Webpack 4</p>

            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <h3>Features:</h3>
                        <List bulleted>
                            <List.Item><strong>Webpack 4</strong>. This boilerplate uses <a href="https://github.com/webpack-contrib/mini-css-extract-plugin">mini-css-extract-plugin</a> supporting CSS/LESS/SASS.</List.Item>
                            <List.Item><strong>Semantic UI</strong>. Uses the <i>JQuery free</i> awesome <a href="https://react.semantic-ui.com/">Semantic UI React</a></List.Item>
                            <List.Item><strong>Webpack dev middleware</strong>. In development mode, there's no need to run the <code>webpack</code> build tool. Your client-side resources are dynamically built on demand. Updates are available as soon as you modify any file.</List.Item>
                            <List.Item><strong>Hot module replacement</strong>. In development mode, you don't even need to reload the page after making most changes. Within seconds of saving changes to files, rebuilt React components will be injected directly into your running application, preserving its live state.</List.Item>
                            <List.Item><strong>Efficient production builds</strong>. In production mode, development-time features are disabled, and the <code>webpack</code> build tool produces minified static CSS and JavaScript files.</List.Item>
                            <List.Item><strong>Typescript 2.8</strong>. Uses the latest version of typescript.</List.Item>
                            <List.Item><strong>i18n</strong>. Example of how to use translations.</List.Item>
                            <List.Item><strong>Typed and scalable stores</strong>. Based on <a href='https://medium.com/@resir014/a-type-safe-approach-to-redux-stores-in-typescript-6474e012b81e'>A type-safe approach to Redux stores in TypeScript</a>.</List.Item>
                        </List>
                        <h4>References</h4>
                        <p>
                            This boilerplate was inspired by the Microsoft .NET Core react-redux template and <a href='https://github.com/jonmcquade/aspnetcore-react-redux'>aspnetcore-react-redux</a>
                        </p>
                    </Grid.Column>
                    <Grid.Column>
                        <h3>{t('Connected component demo')}</h3>
                        <Segment>
                            <WishListView />
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    }
}

// Wire up the React component to the Redux store
export default translate('translations')(connect(
    (state: ApplicationState) => (state), // Selects which state properties are merged into the component's props
    { }                 // Selects which action creators are merged into the component's props
)(HomeView) as any);

