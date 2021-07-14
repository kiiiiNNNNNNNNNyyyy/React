import React from 'react';

class GoogleAuth extends React.Component {

    state = { isSignedIn: null };

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '739672342911-ntk3go21jft7b80vfc2r91286l6mg1il.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    };

    onAuthChange = () => {
        this.setState({
            isSignedIn: this.auth.isSignedIn.get()
        }); 
    };

    onSignIn = () => {
        this.auth.signIn();
    };

    onSignOut = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return null;
        } else if (this.state.isSignedIn) {
            return (
                <button onClick={ this.onSignOut } className="ui red google button">
                    <i className="google icon"></i>
                    Sign Out
                </button>
            )
        } else {
            return (
                <button onClick={ this.onSignIn } className="ui red google button">
                    <i className="google icon"></i>
                    Sign in with google
                </button>
            )
        };
    };

    render() {
        return (
            <div>
                { this.renderAuthButton() }
            </div>
        );
    };
}

export default GoogleAuth;