# React Native Client for Contacts

The React Native Client for the contacts application of the 'Coding with JoeG' stream.

## Installation

### Node

Node.js [installation](https://nodejs.org/en/)

After node.js is installed, if you want to load the required packages ahead of time so the installation goes faster.

```bash
npm install -g expo-cli msal @openapitools/openapi-generator-cli @react-navigation/native @react-navigation/stack
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

### React Native

[React Native](https://reactnative.dev/)
[Setting up your environment](https://reactnative.dev/docs/environment-setup)

```bash
npm install -g expo-cli
```

### Generate API Tools

* [OpenAPI Generator](https://github.com/OpenAPITools/openapi-generator)
* List of [generators](https://openapi-generator.tech/docs/generators)

#### Mature API

If you're API is mature and not changing, you can run the following commands.

```bash
npm install -g @openapitools/openapi-generator-cli -g
openapi-generator-cli generate -i http://cwjg-contacts-api.azurewebsites.net/swagger/v1/swagger.json -g typescript-fetch -o services\customer-api
```

#### Actively developing an API

If your API is in flux, you can use the following to setup your React Native application. Note: change the text of `my-app` to whatever app name you want to use.

```bash
// Bootstrap RN project using TS template
npx create-react-native-app my-app --template with-typescript
// CD into the project
cd my-app
// Add project dependencies
yarn add axios url @react-navigation/native @react-navigation/stack
// Add client generator (as Dev dependency)
yarn add -D @openapitools/openapi-generator-cli
// Create Api folder (for everything API related)
mkdir Api
// Download OAS file to Api folder
curl https://cwjg-contacts-api.azurewebsites.net/swagger/v1/swagger.json > ./Api/openapi.json
// Add generator script to package.json
npx add-project-script -n "openapi" -v "openapi-generator-cli generate -i ./Api/openapi.json -g typescript-axios -o ./Api/generated"
// Generate the client (requires JDK installed)
yarn openapi
```

Whenever you need to update the API client run `yarn openapi`

## Getting started

In the `./Contacts/Api` folder, create a new file `index.ts` with the following contents

```javascript
import { ContactsApi } from './generated';

export default {
    Contacts: new ContactsApi()
};
```

In the `App.tsx` file

Top

```javascript
import Api from './Api'
```

In the `return`

```javascript
<View style={styles.container}>
    <Text>Welcome new followers!</Text>
    <Button title="Hello" onPress={() => {
    var list = Api.Contacts.contactsGet();
    console.log("Hello");}} />
</View>
```

Install the NPM Package

```bash
npm install msal
```

## Configure security

Still a work in progress.

Look at [Azure Samples](https://github.com/Azure-Samples?language=&page=1&q=ms-identity&type=)

Maybe [ms-identity-javascript-react-spa-dotnetcore-webapi-obo](https://github.com/Azure-Samples/ms-identity-javascript-react-spa-dotnetcore-webapi-obo)

Maybe [Axios Intercept](https://github.com/jpda/msaljs-axios-intercept) or with a [popup](https://github.com/jpda/msaljs-sample)

### Steps

Copy msal files

* IRequestConfiguration.ts
* MsalConfig.ts
* MsalHandler.ts

Create the Azure client Application

## References

* [React Native](https://reactnative.dev)
* OpenAPI Tools [OpenAPI Generator](https://github.com/OpenAPITools/openapi-generator)
* [How to automate API code generation (OpenAPI/Swagger) and boost productivity](https://medium.com/tribalscale/how-to-automate-api-code-generation-openapi-swagger-and-boost-productivity-1176a0056d8a)
* [Using Axios with React to Make API Requests](https://upmostly.com/tutorials/using-axios-with-react-api-requests)