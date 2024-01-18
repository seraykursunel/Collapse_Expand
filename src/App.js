import { useEffect, useState } from "react";
import "./styles.css";

function App() {
  return <GenerateList />;
}

const GenerateList = () => {
  const [data, setData] = useState([]);
  const url = "https://www.boredapi.com/api/activity";

  const getActivity = async () => {
    const res = await fetch(url);
    const activity = await res.json();
    // console.log(activity);
    setData([...data, activity]);
    // console.log(data);
  };

  useEffect(() => {
    setData([]);
  }, [url]);

  return (
    <div>
      <div className="container">
        <button onClick={getActivity} className="button">
          Generate Activity
        </button>
      </div>
      {data.map((activity) => {
        return (
          <div key={activity.key}>
            <ExpandableListItem item={activity} />
          </div>
        );
      })}
    </div>
  );
};

const ExpandableListItem = ({ item }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [buttonName, setButtonName] = useState("Expand");

  const DetailCard = ({ item }) => {
    return (
      <ul className="list">
        <li>type:{item.type}</li>
        <li>participants:{item.participants}</li>
        <li>price:{item.price}</li>
        <li>link:{item.link}</li>
        <li>key:{item.key}</li>
        <li>accessibility:{item.accessibility}</li>
      </ul>
    );
  };

  const getDetail = () => {
    setButtonName(buttonName === "Expand" ? "Collapse" : "Expand");
    setShowDetail((p) => !p);
  };

  return (
    <div>
      <div className="container">
        <div className="activity">{item.activity}</div>
        <button onClick={getDetail} className="button-list">
          {buttonName}
        </button>
      </div>
      <div className="show-card">
        {showDetail && <DetailCard item={item} />}
      </div>
    </div>
  );
};

export default App;
