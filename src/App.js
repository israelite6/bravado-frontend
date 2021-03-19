import "./App.css";
import { BrowserRouter, Route, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route path='/:search/:search?' component={OpenApp} exact />
      </BrowserRouter>
    </div>
  );
}

function OpenApp({ ...props }) {
  const { search } = useParams();
  const [state, setState] = useState("");

  const getPlatform = useCallback((event) => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      // true for mobile device
      setState("this is a mobile device");
      window.location = `bravado://search/${search}`;
    } else {
      // false for not mobile device
      setState("not mobile device");
    }
  }, []);

  useEffect(() => {
    getPlatform();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      status: {state} <br />
      My search is <b>{search}</b>
    </div>
  );
}

export default App;
