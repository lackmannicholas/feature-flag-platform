import './App.css';

function List({ featureFlags }) {
  return (
    <div className="Feature-List">
        {featureFlags.map(ff => <li key={ff.featureKey}>{ff.featureKey} {ff.value}</li>)}
    </div>
  );
}

export default List;
