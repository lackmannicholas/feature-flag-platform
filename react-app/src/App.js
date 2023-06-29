import logo from './logo.svg';
import logoS3 from './logoS3.png';
import logoCF from './logoCloudFront.png';
import { Button, Input, Radio } from 'antd';
import './App.css';
import { useFetch, } from "react-async"
import List from './List';
import { useState } from 'react';
import { cloneDeep } from "lodash";

const APIEndPoint = 'https://cgd2h41rrf.execute-api.us-east-1.amazonaws.com/feature-flag'

function App() {
  const [featureFlags, setFeatureFlags] = useState([{featureKey: "test 1", value: true },{featureKey: "test 2", value: false }]);
  const [newFeatureFlag, setNewFeatureFlag] = useState(undefined);

  const onDelete = (i) => setFeatureFlags(featureFlags.splice(i,1));
  const addFeatureFlag = (ff) => {
    const { data, error } = fetch(APIEndPoint, {
      headers: { accept: "application/json" },
      method: "POST",
      body: JSON.stringify({
        userId: "nick",
        featureKey: ff.featureKey,
        value: ff.value
      })
    })
    if (error) { console.log(error) }
    if (data) {
      let newList = cloneDeep(featureFlags);
      newList.push(ff);
      setFeatureFlags(ff);
    }
  }
  
  return (
    <div className="App">
        <header className="App-header">
          <img src={logo} className="App-MainLogo" alt="logo" />
        </header>
        <p>This react-based application is hosted in an S3 bucket exposed through a CloudFront distribution</p>
        <div className="logos">
            <img src={logoS3} className="App-logoR2L" alt="logo S3" />
            <img src={logoCF} className="App-logoL2R" alt="logo CloudFront" />
        </div>
        <List featureFlags={featureFlags} onDelete={onDelete} />
        { newFeatureFlag !== undefined &&
        <div>
          <Input value={newFeatureFlag.featureKey} placeholder='Feature Key'  onChange={(e) => setNewFeatureFlag({...newFeatureFlag, featureKey: e.target.value})} />
          <Radio.Group value={newFeatureFlag.value} onChange={(e) => setNewFeatureFlag({...newFeatureFlag, value: e.target.value})}>
            <Radio value={true}>True</Radio>
            <Radio value={false}>False</Radio>
          </Radio.Group>
          <Button type="primary" onClick={() => { addFeatureFlag(newFeatureFlag); setNewFeatureFlag(undefined); }}>Save</Button>
        </div>
        }
        <Button type="primary" onClick={() => setNewFeatureFlag({ featureKey: "", value: false})}>Add Feature Flag</Button>
    </div>
  );
}

export default App;
