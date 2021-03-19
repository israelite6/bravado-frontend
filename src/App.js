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

  const getPlatform = useCallback((event) => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      // true for mobile device
      setState("this is a mobile device");
      // window.location = `http://israelalegbeleye.com/server?search=${search}`;
      // window.location.replace(
      //   `http://israelalegbeleye.com/server?search=${search}`
      // );
      setTimeout(() => {
        document.forms["myForm"].submit();
      }, 1000);
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
      status: {state} <br />
      My search is <b>{search}</b>
      <form
        action={`http://israelalegbeleye.com/server?search=${search}`}
        method='GET'
        id='form'
        name='myForm'
      >
        <button id='button' type='submit'></button>
      </form>
    </div>
  );
}

export default App;
