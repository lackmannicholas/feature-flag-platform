import logo from './logo.svg';
import { Button } from 'antd';
import './App.css';
import List from './components/List';
import Add from './components/Add';
import { useState, useEffect } from 'react';
import { Auth, Hub } from 'aws-amplify';
import { updateFeatureFlag, getFeatureFlags, addFeatureFlag, deleteFeatureFlag } from './services';

function App() {
  const [featureFlags, setFeatureFlags] = useState([]);
  const [newFeatureFlag, setNewFeatureFlag] = useState();
  const [user, setUser] = useState(null);

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser().then(userData => setUser(userData));
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
      }
    });

    getUser().then(userData => setUser(userData));
  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then(userData => userData)
      .catch(() => Auth.federatedSignIn());
  }


  useEffect(() => {
    const getFF = async () => {
      const ffs = await getFeatureFlags();
      setFeatureFlags(ffs);
    }
    getFF();
  }, []);

  const onDelete = async (i) => {
    const newFFs = await deleteFeatureFlag(i, featureFlags);
    setFeatureFlags(newFFs);
  }

  const onAdd = async (newFF) => {
    const newFFs = await addFeatureFlag(newFF, featureFlags);
    setFeatureFlags(newFFs);
  }

  const onUpdate = async (ff, i) => {
    const newFFs = await updateFeatureFlag(ff, i, featureFlags);
    setFeatureFlags(newFFs);
  }

  return (
    <div className="App">
       <p>User: {user ? JSON.stringify(user.attributes) : 'None'}</p>
      {user ? (
        <button onClick={() => Auth.signOut()}>Sign Out</button>
      ) : (
        <button onClick={() => Auth.federatedSignIn()}>Federated Sign In</button>
      )}
        <header className="App-header">
          <img src={logo} className="App-MainLogo" alt="logo" />
        </header>
        <p>Feature This:</p>
        <List featureFlags={featureFlags} onDelete={onDelete} onUpdate={onUpdate} />
        { newFeatureFlag !== undefined &&
          <Add addFeatureFlag={onAdd} newFeatureFlag={newFeatureFlag} setNewFeatureFlag={setNewFeatureFlag} />
        }
        <Button type="primary" onClick={() => setNewFeatureFlag({ featureKey: "", targeting: false, value: { default: false }})}>Add Feature Flag</Button>
    </div>
  );
}

export default App;
