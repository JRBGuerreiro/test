import React, { useState } from "react";
import { WordandCountObject } from "./TextArea";

type DisplayProps = {
  obj: WordandCountObject
  unmountDisplay: () => void
};

const Display: React.FC<DisplayProps> = ({obj, unmountDisplay}) => {
  //holds the current state for our filter
  const [filter, setFilter] = useState<string | null>(null)

  //order our components alphabetically
  const orderAlphabetically = () => {
    return Object.entries(obj).sort((a,b) => a[0].localeCompare(b[0]))
  }

  //order our components by count
  const orderByCount = () => {
    return Object.entries(obj).sort((a,b) => a[1] - b[1]).reverse()
  }

  //decide how to display our components in the UI based on filter
  const renderBasedOnFilter = () => {
    switch (filter) {
      case "alphabetically": 
        return orderAlphabetically()
      case "count":
        return  orderByCount()
      default:
        return Object.entries(obj);
    }
  }

  return(
  <div>
    {renderBasedOnFilter().map(([word, count]) => {
      return(
        <div data-testid="display-wrapper" className="display-wrapper" key = {word}>
          <p className="display-word">word is: {word}</p>
          <p className="display-count">count is: {count}</p>
        </div>
      ) 
    })}
    <button className="display-reset" onClick={unmountDisplay}>Reset</button>
    {Object.entries(obj).length > 1 && 
    <div>
      <button className="display-alphabetically-button" data-testid="alphabetically-button" onClick={() => setFilter("alphabetically")}>Order alphabetically</button>
      <button className="display-count-button" data-testid="count-button" onClick={() => setFilter("count")}>Order by count</button>
    </div>
    }
    
  </div>
)}
   
export default Display;
