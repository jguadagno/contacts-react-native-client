# React Native Client for Contacts

The React Native Client for the [Contacts application](https://www.github.com/jguadagno/contacts) of the 'Coding with JoeG' [stream](https://jjg.me/stream).

## Prerequisites

You will need to have [Node.js](https://nodejs.org) and [React Native](https://www.reactnative.dev) installed and working.

This also assumes that you are using the [Contacts Api](https://www.github.com/jguadagno/contacts) so that the applications can interact with the contacts.

## Running the samples

Open up a command prompt in the `Contacts` folder and execute the following command to install all of the required node modules

```bash
yarn install
```

Run the Web API locally. This should be configured to execute at *https://localhost:5001*

You will also need to create a file in the `Contacts\msal` folder names `msalconfig.ts`.  This file contains the Microsoft Identity configuration.  The file should contain the follow

```typescript
const MsalConfig = {
    config: {
        // b2c configuration
        auth: {
            clientId: "", // TODO: Replace with your client id
            authority: "https://login.microsoftonline.com/common",
            redirectUri: "http://localhost:19006/Auth",
            navigateToLoginRequestUrl: false,
            validateAuthority: false
        },
        cache: {
            cacheLocation: "sessionStorage" // session storage is more secure, but prevents single-sign-on from working. other option is 'localStorage'
        } as const
    },
    // this is marked as the default, as the scopes for individual pages may be different
    // TODO: Replace these scopes with the scopes for your API.
    defaultRequestConfiguration: {
        scopes: ["api://dc68a11f-d265-4e9c-8a24-abbbd3520f8a/Contacts.Delete",
            "api://dc68a11f-d265-4e9c-8a24-abbbd3520f8a/Contacts.List",
            "api://dc68a11f-d265-4e9c-8a24-abbbd3520f8a/Contacts.Save",
            "api://dc68a11f-d265-4e9c-8a24-abbbd3520f8a/Contacts.Search",
            "api://dc68a11f-d265-4e9c-8a24-abbbd3520f8a/Contacts.View"]
    }
}
export default MsalConfig;
```

Once configured, you should be able to run

```bash
yarn web
```

to run the application.

## References

* [React Native](https://reactnative.dev)
* OpenAPI Tools [OpenAPI Generator](https://github.com/OpenAPITools/openapi-generator)
* [How to automate API code generation (OpenAPI/Swagger) and boost productivity](https://medium.com/tribalscale/how-to-automate-api-code-generation-openapi-swagger-and-boost-productivity-1176a0056d8a)
* [Using Axios with React to Make API Requests](https://upmostly.com/tutorials/using-axios-with-react-api-requests)
* [React Native Dev Tools](https://microsoftedge.microsoft.com/addons/detail/react-developer-tools/gpphkfbcpidddadnkolkpfckpihlkkil)
* JP Dandison, aka [@AzureAndChill](https://www.twitter.com/AzureAndChill) [Axios Intercept](https://github.com/jpda/msaljs-axios-intercept) with Microsoft Identity Library for JavaScript [MSAL.js](https://github.com/AzureAD/microsoft-authentication-library-for-js)