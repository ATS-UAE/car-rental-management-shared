import React from "react";
import { shallow } from "enzyme";
import { Loading } from ".";

describe("Loading", () => {
	it("Renders a node.", () => {
		const component = shallow(<Loading />);

		expect(component.type()).not.toEqual(null);
	});
});
