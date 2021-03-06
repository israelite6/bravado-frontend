/* eslint-disable no-restricted-globals */
import "./App.css";
import { BrowserRouter, Route, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route path='/search/:search?' component={OpenApp} exact />
      </BrowserRouter>
    </div>
  );
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

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
        setIsAndroid(isAndroid);
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
      <Modal
        isOpen={isAndroid}
        onAfterOpen={() => {}}
        onRequestClose={() => {}}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <h2>Open this page in bravado?</h2>
        <button
          onClick={() => {
            window.location = `bravado://search/${search}`;
          }}
        >
          Yes
        </button>
      </Modal>
      status: {state} <br />
      My search is <b>{search}</b>
    </div>
  );
}

export default App;
