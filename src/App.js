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

  function eventFire(el, etype) {
    if (el.fireEvent) {
      el.fireEvent("on" + etype);
    } else {
      var evObj = document.createEvent("Events");
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  }
  const getPlatform = useCallback((event) => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      // true for mobile device
      setState("this is a mobile device");
      window.location = `bravado://search/${search}`;
      window.location.replace(`bravado://search/${search}`);
    } else {
      // false for not mobile device
      setState("not mobile device");
    }
  }, []);

  useEffect(() => {
    getPlatform();
    setTimeout(() => {
      // document.getElementById("button").click();
      eventFire(document.getElementById("button"), "click");
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <a href={`bravado://search/${search}`} id='button'>
        button
      </a>
      status: {state} <br />
      My search is <b>{search}</b>
    </div>
  );
}

export default App;
