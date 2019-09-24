// --
declare module "@b6y/ui" {
    global {
        interface Window {
            __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
            Intl: typeof Intl;
        }

        interface NodeModule {
            hot: any;
        }
    }
}