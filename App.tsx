import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

const API_KEY = 'cerete::stepzen.net+1000::6d700fd2c1a3ccf03ca59f793eeebf0f4afc1cf0f9c2d5cad603f79c7744ee37'

const client = new ApolloClient({
    uri: "https://cerete.stepzen.net/api/running-skunk/__graphql",
    headers: {
        Authorization: `Apikey ${API_KEY}`
    },
    cache: new InMemoryCache()
})


export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <ApolloProvider client={client}>
                    <Navigation colorScheme={colorScheme}/>
                </ApolloProvider>
                <StatusBar/>
            </SafeAreaProvider>
        );
    }
}
