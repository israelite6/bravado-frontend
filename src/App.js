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

  const redirect = useCallback((event) => {
    window.location = `bravado://search/${search}`;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    redirect();
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
