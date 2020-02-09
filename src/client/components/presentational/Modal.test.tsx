import React, { FC } from "react";
import { Backdrop } from "@material-ui/core";
import { Modal } from ".";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";

describe("Modal", () => {
	test("Renders when on correct route", () => {
		const ModalContent: FC<{}> = () => <h1>Hi There</h1>;
		const modalRendered = mount(
			<MemoryRouter
				initialEntries={[
					{
						pathname: "/1",
						state: {
							background: true
						}
					}
				]}
			>
				<Modal open={true}>
					<ModalContent />
				</Modal>
				}
			</MemoryRouter>
		);
		expect(modalRendered.find(ModalContent)).toHaveLength(1);

		const modalNotRendered = mount(
			<MemoryRouter
				initialEntries={[
					{
						pathname: "/",
						state: {
							background: true
						}
					}
				]}
			>
				<Modal open={true}>
					<ModalContent />
				</Modal>
				}
			</MemoryRouter>
		);
		expect(modalNotRendered.find(ModalContent)).toHaveLength(0);
	});

	test("Hides when background clicked.", () => {
		const ModalContent: FC<{}> = () => <h1>Hi There</h1>;
		const onCloseMock = jest.fn();
		const modalRendered = mount(
			<MemoryRouter
				initialEntries={[
					{
						pathname: "/1",
						state: {
							background: true
						}
					}
				]}
			>
				<Modal open={true} onClose={onCloseMock}>
					<ModalContent />
				</Modal>
				}
			</MemoryRouter>
		);

		const backdrop = modalRendered.find(Backdrop);

		expect(backdrop).toBeDefined();

		backdrop.simulate("click");

		expect(onCloseMock).toBeCalledTimes(1);
	});
});
