import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import TextArea, {WordandCountObject} from "./components/TextArea";
import Display from "./components/Display"

it("Display should not be on screen on first load", () => {
    const fakeObj: WordandCountObject = {}
    // mock function
    const unmount = jest.fn();
    const {queryByTestId} = render(<Display obj={fakeObj} unmountDisplay={unmount}/>)

    expect(queryByTestId("display-wrapper")).not.toBeTruthy();
})

it("Display should be on screen after TextArea has input and button is pressed but no buttons, apart from reset, should be loaded", () => {
    //just a mock function
    const callback = jest.fn();

    //another mock function
    const unmount = jest.fn();

    const obj: WordandCountObject = {"finish":1}

    const {queryByTestId, queryByPlaceholderText} = render(<TextArea callback={callback}/>);

    //grab our textarea
    const textAreaInput = queryByPlaceholderText("Please insert your text");

    //fire event will insert text in the textarea
    fireEvent.change(textAreaInput as HTMLElement, {target: {value: "testing"}})

    //click our button to display word and count
    fireEvent.click(queryByTestId("textarea-button") as HTMLElement);

    const display = render(<Display obj={obj} unmountDisplay={unmount}/>)

    expect(display.queryByTestId("display-wrapper")).toBeTruthy();

    //check we have one instance of our display wrapper
    expect(display.queryAllByTestId("display-wrapper")).toHaveLength(1);

    //reset button should be displayed
    expect(display.queryByTestId("reset-button")).toBeTruthy();
    //our expectation with one single item in the our object is that the buttons are not in the DOM
    expect(display.queryByTestId("alphabetically-button")).not.toBeTruthy();
    expect(display.queryByTestId("count-button")).not.toBeTruthy();
})

it("Display should be on screen after TextArea has input > 1 word and button is pressed, both buttons in display should also be in the DOM", () => {
    //just a mock function
    const callback = jest.fn();

    //another mock function
    const unmount = jest.fn();

    const textarea = render(<TextArea callback={callback}/>);
    //grab our textarea
    const textAreaInput = textarea.queryByPlaceholderText("Please insert your text");

    //fire event will insert text in the textarea
    fireEvent.change(textAreaInput as HTMLElement, {target: {value: "testing is"}})

    //click our button to display word and count
    fireEvent.click(textarea.queryByTestId("textarea-button") as HTMLElement);

    /**
     * since these test are to assert what the user would see and not internal functions declared on our functional component,
     * i'll pass in the object returned from state using the value of "testing is" as our input in the text area
     */
    const obj: WordandCountObject = {"testing": 1, "is": 1};

    const display = render(<Display obj={obj} unmountDisplay={unmount}/>)

    expect(display.queryAllByTestId("display-wrapper")).toBeTruthy();
    //check we have two instances of our display wrapper
    expect(display.queryAllByTestId("display-wrapper")).toHaveLength(2);
    //our expectation with more than one item in our object is that the buttons are rendered to the DOM
    expect(display.queryByTestId("alphabetically-button")).toBeTruthy();
    expect(display.queryByTestId("count-button")).toBeTruthy();
})


it("Display components should be on screen and organised alphabetically ", () => {
    //just a mock function
    const callback = jest.fn();

    //another mock function
    const unmount = jest.fn();

    const textarea = render(<TextArea callback={callback}/>);
    //grab our textarea
    const textAreaInput = textarea.queryByPlaceholderText("Please insert your text");

    //fire event will insert text in the textarea
    fireEvent.change(textAreaInput as HTMLElement, {target: {value: "testing is really really really really fun testing is testing"}})

    //click our button to display word and count
    fireEvent.click(textarea.queryByTestId("textarea-button") as HTMLElement);

    /**
     * since these test are to assert what the user would see and not internal functions declared on our functional component,
     * i'll pass in the object returned from state using the value of "testing is" as our input in the text area
     */
    const obj: WordandCountObject = {"testing": 3, "is": 2, "really":4};

    const display = render(<Display obj={obj} unmountDisplay={unmount}/>)

    const displayWrappers = display.queryAllByTestId("display-wrapper");

    //Display component should be in the DOM
    expect(displayWrappers).toBeTruthy();
    //check we have three instances of our Display component
    expect(displayWrappers).toHaveLength(3);

    // order alphabetically
    fireEvent.click(display.queryByTestId("alphabetically-button") as HTMLElement);

    //Display components after sorting
    const displayWrappersAfterSorting = display.queryAllByTestId("display-wrapper");
    //how the components should be layed out
    const expectedResult = ["is2", "really4", "testing3"]

    displayWrappersAfterSorting.forEach((display, index) => {
        expect(display.textContent == expectedResult[index]).toBeTruthy()
    })
})

it("Display components should be on screen and organised by count ", () => {
    //just a mock function
    const callback = jest.fn();

    //another mock function
    const unmount = jest.fn();

    const textarea = render(<TextArea callback={callback}/>);
    //grab our textarea
    const textAreaInput = textarea.queryByPlaceholderText("Please insert your text");

    //fire event will insert text in the textarea
    fireEvent.change(textAreaInput as HTMLElement, {target: {value: "testing is really really really really fun testing is testing"}})

    //click our button to display word and count
    fireEvent.click(textarea.queryByTestId("textarea-button") as HTMLElement);

    /**
     * since these test are to assert what the user would see and not internal functions declared on our functional component,
     * i'll pass in the object returned from state using the value of "testing is" as our input in the text area
     */
    const obj: WordandCountObject = {"testing": 3, "is": 2, "really":4};

    const display = render(<Display obj={obj} unmountDisplay={unmount}/>)

    const displayWrappers = display.queryAllByTestId("display-wrapper");

    //Display component should be in the DOM
    expect(displayWrappers).toBeTruthy();
    //check we have three instances of our Display component
    expect(displayWrappers).toHaveLength(3);

    // order alphabetically
    fireEvent.click(display.queryByTestId("count-button") as HTMLElement);

    //Display components after sorting
    const displayWrappersAfterSorting = display.queryAllByTestId("display-wrapper");
    const expectedResult = ["really4", "testing3", "is2"]
    displayWrappersAfterSorting.forEach((display, index) => {
        expect(display.textContent == expectedResult[index]).toBeTruthy()
    })
})