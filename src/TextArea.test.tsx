import React from "react";
import { fireEvent, render } from "@testing-library/react";
import TextArea from "./components/TextArea";

//Is text area rendering correctly?
it("TextArea renders correctly", () => {
    //just a mock function
    const mockFnc = jest.fn()
    //render our component
    const {queryByTestId} = render(<TextArea callback={mockFnc}/>)
    //is the textarea rendering?
    expect(queryByTestId("textarea")).toBeTruthy()
})

it("Input value on textarea", () => {
    //just a mock function
    const mockFnc = jest.fn()

    const container = render(<TextArea callback= {mockFnc}/>)

    const textArea = container.getByRole("textbox")

    fireEvent.change(textArea, {target: {value: "testing"}})

    expect(textArea.textContent).toBe("testing")
})

describe("button to display word and count", () => {
    describe("with empty text area", () => {
        it("does not trigger callback function", () => {
            //just a mock function
            const callback = jest.fn();

            const {queryByTestId} = render(<TextArea callback={callback}/>);

            fireEvent.click(queryByTestId("textarea-button") as HTMLElement);

            expect(callback).not.toHaveBeenCalled(); 
        })
    })

    describe("with data inside textarea", () => {
        it("triggers calllback function", () => {
            //just a mock function
            const callback = jest.fn();

            const {queryByTestId, queryByPlaceholderText} = render(<TextArea callback={callback}/>);

            //grab our textarea
            const textAreaInput = queryByPlaceholderText("Please insert your text");

            //fire event will insert text in the textarea
            fireEvent.change(textAreaInput as HTMLElement, {target: {value: "testing"}})

            //click our button to display word and count
            fireEvent.click(queryByTestId("textarea-button") as HTMLElement);

            //callback should have been called
            expect(callback).toHaveBeenCalled(); 
        })
    })
})

