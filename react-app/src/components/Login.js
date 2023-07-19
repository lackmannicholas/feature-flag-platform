import './App.css';
import { useState, useEffect } from 'react';
import { Auth, Hub } from 'aws-amplify';

function Login() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          console.log('Authenticated...');
          console.log(data);
          setCurrentUser(data);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Error', data);
          break;
      }
    });

    Auth.federatedSignIn();
  }, []);

    const initUser = async () => {
        Auth.federatedSignIn();
        const user = await Auth.currentAuthenticatedUser();
        console.log(user);
        setCurrentUser(user);
    }  

  return (
    <div className="Login">
    </div>
  );
}

export default Login;
