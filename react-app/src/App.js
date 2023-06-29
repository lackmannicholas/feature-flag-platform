import logo from './logo.svg';
import { Button } from 'antd';
import './App.css';
import List from './components/List';
import Add from './components/Add';
import { useState, useEffect } from 'react';
import { updateFeatureFlag, getFeatureFlags, addFeatureFlag, deleteFeatureFlag } from './services';


function App() {
  const [featureFlags, setFeatureFlags] = useState([]);
  const [newFeatureFlag, setNewFeatureFlag] = useState();

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
