import { useState } from "react";
import "./App.css";
import TextArea, {WordandCountObject} from "./components/TextArea";
import Display from "./components/Display"

function App() {
  //state to store object passed in from TextArea component
  const [wordCountObj, setWordCountObj] = useState<WordandCountObject | null>(null);

  //function we pass to the callback prop from TextArea that receives our wordandcount object and sets it in state
  function onWordCountChanged(obj: WordandCountObject) {
    setWordCountObj(obj);
  }
  return (
    <div className="App">
      <TextArea callback = {onWordCountChanged}></TextArea>
      {/* conditionally render our display components */}
      {wordCountObj && <Display obj = {wordCountObj}></Display>}
    </div>
  );
}

export default App;
