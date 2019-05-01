import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';

// let apolloClient = null;

const errorLink = onError(({ graphQLErrors }) => {
	if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

const httpLink = createHttpLink({
	uri: 'http://localhost:8080/graphql',
	credentials: 'include',
});

const appCache = new InMemoryCache();

const stateLink = withClientState({
	cache: appCache,
});

let apolloClient = new ApolloClient({
	link: ApolloLink.from([errorLink, stateLink, httpLink]), // order of errorLink, stateLink, httpLink is important
	cache: appCache,
});

export default apolloClient;
