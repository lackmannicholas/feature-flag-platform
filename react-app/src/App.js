import logo from './logo.svg';
import { Button } from 'antd';
import './App.css';
import List from './components/List';
import Add from './components/Add';
import { useState, useEffect } from 'react';
import { updateFeatureFlag, getFeatureFlags, addFeatureFlag } from './services';


function App() {
  const [featureFlags, setFeatureFlags] = useState([{featureKey: "test 1", targeting: true, value: {default: false} },{featureKey: "test 2", targeting: false, value: { default: true} }]);
  const [newFeatureFlag, setNewFeatureFlag] = useState();

  useEffect(() => {
    const getFF = async () => {
      const ffs = await getFeatureFlags();
      setFeatureFlags(ffs);
    }
    getFF();
  }, []);

  const onDelete = (i) => setFeatureFlags(featureFlags.splice(i,1));
  
  return (
    <div className="App">
        <header className="App-header">
          <img src={logo} className="App-MainLogo" alt="logo" />
        </header>
        <p>Feature This:</p>
        <List featureFlags={featureFlags} onDelete={onDelete} onUpdate={(updatedFF, i) => updateFeatureFlag(updatedFF, i, featureFlags)} />
        { newFeatureFlag !== undefined &&
          <Add addFeatureFlag={(newFF) => addFeatureFlag(newFF, featureFlags)} newFeatureFlag={newFeatureFlag} setNewFeatureFlag={setNewFeatureFlag} />
        }
        <Button type="primary" onClick={() => setNewFeatureFlag({ featureKey: "", targeting: false, value: ''})}>Add Feature Flag</Button>
    </div>
  );
}

export default App;
