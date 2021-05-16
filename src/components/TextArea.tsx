import React, { useState } from "react";

//object to be populated with word and count
export interface WordandCountObject {
  [word: string]: number
};

//our callback
type WordCountChangedCallback = (obj: WordandCountObject) => void

//function we get passed in from our parent so we send our current WordandCountObject
type TextAreaProps = {
  callback: WordCountChangedCallback
}

const TextArea: React.FC<TextAreaProps>= ({callback}) => {
  //state to store current value on textarea
  const [textAreaValue, setTextAreaValue] = useState<string>("");

  //handle change will consume what the user types in the text are element and save it to state
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setTextAreaValue(event.target.value);
  };

  //utility function that will split the string on each empty space and count 
  const splitByWordAndCount = (event: React.MouseEvent<HTMLButtonElement>) => {
    //prevent page refresh//
    event.preventDefault();
    /**
     * clearString will be the outcome of striping out numbers, punctuation and any multiple adjacent whitespaces from the textArea output
     * Regex explained:
     * [^\w\s]|_ - anything that is not a letter, digit gets replaced by a whitespace
     * [0-9] - anything that is a digit gets replaced for a white space - this is made under the assumption the display component should only display actual strings
     * \s{2,}/ - collapses multi adjacent whitespaces to single spaces
     */
    const clearString = textAreaValue.replace(/[^\w\s]|_/g, "").replace(/[0-9]/g, "").replace(/\s{2,}/g," ");
    //grab textAreaValue from state and split it
    const split = clearString.trim().split(" ");
    //our object to be populated with words and counts
    var obj:WordandCountObject = {};

    //iterate through split our array of strings and inject each word to the object along with the amount of times it repeats itself
    for (let i = 0; i < split.length; i++) {
      if(split[i] === "") {
        return;
      } else if (obj[split[i]] === undefined) {  //first entry for this word? add to obj and set count to 1
        obj[split[i]] = 1;
      } else {
        obj[split[i]]++;
      }
    }   
    console.log(obj)
    callback(obj);
  }

  //render it to DOM
  return (
    <div className="textarea-formwrapper">
      <form className="textarea-form">
        <textarea data-testid="textarea" className="textarea" value={textAreaValue} placeholder="Please insert your text" onChange={handleChange}></textarea>
        <button data-testid="textarea-button" onClick={splitByWordAndCount}>Display word and count</button>
      </form>
    </div>
  );
};

export default TextArea;
