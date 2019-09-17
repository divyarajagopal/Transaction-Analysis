import React from "react";
import expect from "expect";
import ReactDOM from "react-dom";
import { renderToStaticMarkup as render } from "react-dom/server";
import { configure, mount, shallow, ShallowWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CsvParse from "./csvParse";

const mockFunc = () => true;
const keys = ["transactionid", "createAt"];
configure({ adapter: new Adapter() });
describe("TransactionAnalysis", () => {
  it('renders an input with type="file"', () => {
    expect(
      render(
        <CsvParse
          keys={keys}
          onDataUploaded={mockFunc}
          render={onChange => <input type="file" />}
        />
      )
    ).toContain('<input type="file"/>');
  });
  it("calls onSubmit function when form is submitted", () => {
    const onSubmitFn = jest.fn();
    const wrapper = mount(<form onSubmit={onSubmitFn} />);
    const form = wrapper.find("form");
    form.simulate("submit");
    expect(onSubmitFn).toHaveBeenCalledTimes(1);
  });
  it("calls onSubmit function when form is submitted", () => {
    const onSubmitFn = jest.fn();
    const wrapper = mount(<form onSubmit={onSubmitFn} />);
    const form = wrapper.find("form");
    form.simulate("submit");
    expect(onSubmitFn).toHaveBeenCalledTimes(1);
  });
  it("calls onSubmit function when form is submitted", () => {
    const onSubmitFn = jest.fn();
    const wrapper = mount(<form onSubmit={onSubmitFn} />);
    const form = wrapper.find("form");
    form.simulate("submit");
    expect(onSubmitFn).toHaveBeenCalledTimes(1);
  });
  
});
