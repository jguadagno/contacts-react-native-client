# React Native Client for Contacts

The React Native Client for the contacts application of the 'Coding with JoeG' stream.

## Installation

### Node

Node.js [installation](https://nodejs.org/en/)

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

If your API is in flux, you can use the following to setup your React Native application.

```bash
// Bootstrap RN project using TS template
npx create-react-native-app my-app --template with-typescript
// CD into the project
cd my-app
// Add project dependencies
yarn add axios url
// Add client generator (as Dev dependency)
yarn add -D @openapitools/openapi-generator-cli
// Create Api folder (for everything API related)
mkdir Api
// Download OAS file to Api folder
curl https://cwjg-contacts-api.azurewebsites.net/swagger/v1/swagger.json > ./Api/openapi.json
// Add generator script to package.json
npx add-project-script -n "openapi" -v "openapi-generator generate -i ./Api/openapi.json -g typescript-axios -o ./Api/generated"
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

Install the NPM Package

```bash
npm install -g msal
```

Look at [Azure Samples](https://github.com/Azure-Samples?language=&page=1&q=ms-identity&type=)
