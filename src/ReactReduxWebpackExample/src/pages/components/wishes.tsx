import * as React from 'react';
import { Input, Button, List, Icon, Dimmer, Loader } from 'semantic-ui-react'
import { RouteComponentProps } from 'react-router';
import { WishListState } from 'src/stores/wishes/types';
import { actionCreators as wishesActionCreators } from 'src/stores/wishes/actions';
import { connect } from 'react-redux';
import { ApplicationState } from 'src/stores/store';
import * as autobind from 'autobind'
import { translate, Trans } from 'react-i18next';

interface WishListViewProps {

}

interface WishListViewState {
    newWish: string,
}

type AllProps = WishListViewProps
    & WishListState
    & typeof wishesActionCreators;

class WishListView extends React.Component<AllProps, WishListViewState> {
    constructor(props: AllProps) {
        super(props);
        this.state = {
            newWish: ""
        }
    }

    componentWillMount() {
        this.props.load();
    }

    @autobind
    private onAddWish() {
        if (this.state.newWish) {
            this.props.add({ title: this.state.newWish });
            this.setState({ newWish: "" });
        }
    }

    public render() {
        const { t } = this.props as any;
        return (<div>
            <Dimmer active={this.props.isBusy}>
                <Loader>Loading</Loader>
            </Dimmer>
            <Input type='text' placeholder={t('Make a wish...')} action value={this.state.newWish} onChange={(e, { value }) => this.setState({ newWish: value })}>
                <input />
                <Button onClick={this.onAddWish}>{t('Add wish')}</Button>
            </Input>
            {this.props.list && <List>
                {this.props.list.map(wish => (
                    <List.Item key={wish.title}>
                        <List.Icon name='star' />
                        <List.Content>
                            <List.Header as='a'>{wish.title}</List.Header>
                        </List.Content>
                    </List.Item>
                ))}
            </List>}
        </div>
        )
    }
}

// Wire up the React component to the Redux store
export default translate('translations')(connect(
    (state: ApplicationState) => {
        return (state.wishes as WishListState)
    }, // Selects which state properties are merged into the component's props
    { ...wishesActionCreators }                 // Selects which action creators are merged into the component's props
)(WishListView) as any);