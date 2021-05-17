import { useState } from "react";
import "./App.css";
import TextArea, {WordandCountObject} from "./components/TextArea";
import Display from "./components/Display"

function App() {
  //state to store object passed in from TextArea component
  const [wordCountObj, setWordCountObj] = useState<WordandCountObject | null>(null);

  //state to decide if display component should be rendered in the DOM or not
  const [renderDisplay, setRenderDisplay] = useState<Boolean>(false)

  //function we pass to the callback prop from TextArea that receives our wordandcount object and sets it in state
  function onWordCountChanged(obj: WordandCountObject) {
    setWordCountObj(obj);
    setRenderDisplay(true);
  }

  //Display component to be removed from the DOM
  function unmountDisplay() {
    setWordCountObj(null);
    setRenderDisplay(false);
  }

  return (
    <div className="App">
      <TextArea callback = {onWordCountChanged}></TextArea>
      {/* conditionally render our display components */}
      {wordCountObj && renderDisplay && <Display obj = {wordCountObj} unmountDisplay={unmountDisplay}></Display>}
    </div>
  );
}

export default App;
