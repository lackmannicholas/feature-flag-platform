import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure({
  Auth: {
      region: awsExports.REGION,
      userPoolId: awsExports.USER_POOL_ID,
      userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID,
      mandatorySignIn: true,
      oauth: {
        domain: 'feature-flag-platform-dev.auth.us-east-1.amazoncognito.com',
        scope: ['email', 'openid', 'profile', 'phone', 'aws.cognito.signin.user.admin'],
        redirectSignIn: 'http://localhost:3000',
        redirectSignOut: 'http"//localhost:3000',
        responseType: 'code',
      },
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

