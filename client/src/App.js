import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AllRoutes from "./AllRoutes";
import { fetchAllQuestions } from "./actions/question";
import { fetchAllUsers } from "./actions/users";

function App() {
  const dispatch = useDispatch();

  const language = useSelector((state) => state.langReducer) ;
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');

  useEffect(() => {
    switch (language) {
      case 'hi':
        setBackgroundColor('blue');
        break;
      case 'zh':
        setBackgroundColor('green');
        break;
      case 'fr':
        setBackgroundColor('yellow');
        break;
      default:
        setBackgroundColor('white');
        break;
    }
  }, [language]);

  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const [slideIn, setSlideIn] = useState(true);

  useEffect(() => {
    if (window.innerWidth <= 760) {
      setSlideIn(false);
    }
  }, []);

  const handleSlideIn = () => {
    if (window.innerWidth <= 760) {
      setSlideIn((state) => !state);
    }
  };

  return (
    <div className="App" style={{backgroundColor : backgroundColor}}>
      <Router>
        <Navbar handleSlideIn={handleSlideIn}/>
        <AllRoutes slideIn={slideIn} handleSlideIn={handleSlideIn} />
      </Router>
    </div>
  );
}

export default App;
