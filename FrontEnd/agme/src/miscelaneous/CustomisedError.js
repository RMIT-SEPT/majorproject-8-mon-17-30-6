import React from 'react';
export default class CustomisedError extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        console.log(error)
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log(error)
        console.log(errorInfo)
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <div>
                <h1>An unexpected error has occurred</h1>
                    <p>Please refresh your browser</p>
            </div>;
        }

        return this.props.children;
    }
}