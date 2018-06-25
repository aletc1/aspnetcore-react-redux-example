# ASP.NET Core 2.0 + React 16 + Redux + Webpack 4

Welcome to this boilerplate.

> **Important version notice**: Currently semantic ui less package requires LESS 2 (not 3) and ASP.NET Core Webpack middleware requires react-hot-module 3 (not 4).
> Specific verions:
> - "react-hot-loader": "^3.1.0",
> - "less": "^2.7.3",

## How to run
```
npm install
npm start
```
Additonally, you can use the following commands:
- ```npm run build-Release``` to build minified & ready to production bundle
- ```dotnet run -c Release``` run the web app in release mode and test it.

## Features:
- **Webpack 4**. This boilerplate uses [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) supporting CSS/LESS/SASS.
- **Semantic UI**. Uses the JQuery free awesome [Semantic UI React](https://react.semantic-ui.com/)
- **Webpack dev middleware**. In development mode, there's no need to run the webpack build tool. Your client-side resources are dynamically built on demand. Updates are available as soon as you modify any file.
- **Hot module replacement**. In development mode, you don't even need to reload the page after making most changes. Within seconds of saving changes to files, rebuilt React components will be injected directly into your running application, preserving its live state.
- **Efficient production builds**. In production mode, development-time features are disabled, and the webpack build tool produces minified static CSS and JavaScript files.
- **Typescript 2.8**. Uses the latest version of typescript.
- **i18n**. Example of how to use translations.
- **Typed and scalable stores**. Based on [A type-safe approach to Redux stores in TypeScript](https://medium.com/@resir014/a-type-safe-approach-to-redux-stores-in-typescript-6474e012b81e).
## References
This boilerplate was inspired by the Microsoft .NET Core react-redux template and aspnetcore-react-redux
