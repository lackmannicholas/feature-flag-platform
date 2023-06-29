import logo from './logo.svg';
import logoS3 from './logoS3.png';
import logoCF from './logoCloudFront.png';
import { Button } from 'antd';
import './App.css';
import { useFetch } from "react-async"
import List from './List';
import { useState } from 'react';

const APIEndPoint = 'https://cgd2h41rrf.execute-api.us-east-1.amazonaws.com/feature-flag'

function App() {
  const [featureFlags, setFeatureFlags] = useState([{featureKey: "test 1", value: true },{featureKey: "test 2", value: false }]);
  return (
    <div className="App">
        <header className="App-header">
          {APIEndPoint.startsWith('http') &&
            <APIResult />
          }
          <img src={logo} className="App-MainLogo" alt="logo" />
        </header>
        <p>This react-based application is hosted in an S3 bucket exposed through a CloudFront distribution</p>
        <div className="logos">
            <img src={logoS3} className="App-logoR2L" alt="logo S3" />
            <img src={logoCF} className="App-logoL2R" alt="logo CloudFront" />
        </div>
        <List featureFlags={featureFlags} />
        <Button type="primary">Add Feature Flag</Button>
    </div>
  );
}

const APIResult = () => {
  const { data, error } = useFetch(APIEndPoint, {
    headers: { accept: "application/json" },
  })
  if (error) return <p>{error.message}</p>
  if (data) return <p>{data.message}</p>
  return null
}

export default App;
