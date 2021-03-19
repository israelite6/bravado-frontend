/* eslint-disable no-restricted-globals */
import "./App.css";
import { BrowserRouter, Route, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route path='/search/:search?' component={OpenApp} exact />
      </BrowserRouter>
    </div>
  );
}

function OpenApp({ ...props }) {
  const { search } = useParams();
  const [state, setState] = useState("");
  const [isAndroid, setIsAndroid] = useState(false);

  const getPlatform = useCallback((event) => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      // true for mobile device
      let isAndroid = /(android)/i.test(navigator.userAgent);
      if (isAndroid) {
        setState("this is a mobile device");
        let con = confirm("Open this page in bravado?");
        if (con) {
          window.location = `bravado://search/${search}`;
        }
      } else {
        setState("this is a mobile device");
        window.location = `bravado://search/${search}`;
      }
    } else {
      // false for not mobile device
      setState("not mobile device");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getPlatform();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {isAndroid && (
        <button
          onPress={() => (window.location = `bravado://search/${search}`)}
        >
          Launch
        </button>
      )}
      status: {state} <br />
      My search is <b>{search}</b>
    </div>
  );
}

export default App;
