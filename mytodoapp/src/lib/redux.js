import React from 'react';
import { Provider } from 'react-redux';
import { initializeStore } from '../components/redux/store';
let reduxStore 



const getOrInitializeStore = (initialReduxState ) => {
    const reduxState = {...initialReduxState
    }
    if (typeof window === 'undefined') {
        return initializeStore(reduxState);
    }

    if (!reduxStore) {
        reduxStore = initializeStore(reduxState);
    }

    return reduxStore;
};

export const withRedux = (PageComponent , { ssr = true } = {}) => {
    const WithRedux = ({ initialReduxState, ...props }) => {
        const store = getOrInitializeStore(initialReduxState);
        return (
            <Provider store={store}>
                <PageComponent {...props} />
            </Provider>
        );
    };


    if (ssr || PageComponent.getInitialProps) {
        WithRedux.getInitialProps = async (context) => {
           
            const reduxStore = getOrInitializeStore({});
            context.reduxStore = reduxStore;
            const pageProps =
                typeof PageComponent.getInitialProps === 'function' ? await PageComponent.getInitialProps(context) : {};
            return {
                ...pageProps,
                initialReduxState: reduxStore.getState(),
            };
        };
    }

    return WithRedux;
};
