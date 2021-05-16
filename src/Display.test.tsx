import React from "react";
import { fireEvent, render } from "@testing-library/react";
import TextArea, {WordandCountObject} from "./components/TextArea";
import Display from "./components/Display"
import App from "./App";

it("Display should not be on screen on first load", () => {
    const fakeObj: WordandCountObject = {}
    const {queryByTestId} = render(<Display obj={fakeObj}/>)

    expect(queryByTestId("display-wrapper")).not.toBeTruthy();
})

it("Display should be on screen after TextArea has input and button is pressed but no buttons should be loaded", () => {
    //just a mock function
    const callback = jest.fn();

    const obj: WordandCountObject = {"finish":1}

    const {queryByTestId, queryByPlaceholderText} = render(<TextArea callback={callback}/>);

    //grab our textarea
    const textAreaInput = queryByPlaceholderText("Please insert your text");

    //fire event will insert text in the textarea
    fireEvent.change(textAreaInput as HTMLElement, {target: {value: "testing"}})

    //click our button to display word and count
    fireEvent.click(queryByTestId("textarea-button") as HTMLElement);

    const display = render(<Display obj={obj}/>)

    expect(display.queryByTestId("display-wrapper")).toBeTruthy();
    //our expectation with one single item in the our object is that the buttons are not in the DOM
    expect(display.queryByTestId("alphabetically-button")).not.toBeTruthy();
    expect(display.queryByTestId("count-button")).not.toBeTruthy();
})

it("Display should be on screen after TextArea has input and button is pressed", () => {
    //just a mock function
    const callback = jest.fn();

    const obj: WordandCountObject = {"finish":1, "hello":1}

    const {queryByTestId, queryByPlaceholderText} = render(<TextArea callback={callback}/>);

    //grab our textarea
    const textAreaInput = queryByPlaceholderText("Please insert your text");

    //fire event will insert text in the textarea
    fireEvent.change(textAreaInput as HTMLElement, {target: {value: "testing"}})

    //click our button to display word and count
    fireEvent.click(queryByTestId("textarea-button") as HTMLElement);

    const display = render(<Display obj={obj}/>)

    expect(display.queryAllByTestId("display-wrapper")).toBeTruthy();
    //our expectation with one single item in the our object is that the buttons are not in the DOM
    expect(display.queryByTestId("alphabetically-button")).toBeTruthy();
    expect(display.queryByTestId("count-button")).toBeTruthy();
})