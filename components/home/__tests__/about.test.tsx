// import About from "../About";
// import { render, screen, within } from "@testing-library/react";
// import {
//   afterEach,
//   beforeEach,
//   describe,
//   expect,
//   test,
//   vi,
//   type Mock,
// } from "vitest";
//
// describe.only("<About />", () => {
//   let wrapper: any;
//   const props = {
//     animation: vi.fn(() => ""),
//   };
//
//   beforeEach(async () => {
//     wrapper = await render(<About {...props} />);
//   });
//
//   test("renders without crashing", () => {
//     // expect(wrapper.find("section.about")).toHaveLength(1);
//     const main = within(screen.getByRole("main"));
//     expect(
//       main.getByRole("heading", { level: 1, name: /welcome to next\.js!/i })
//     ).toBeDefined();
//   });
//
//   test.skip("snapshot matches", () => {
//     expect(wrapper).toMatchSnapshot();
//   });

// test('analytics hooks are called', () => {
//     jest.spyOn(About.prototype, 'analytics');
//     const mockReactGA = jest
//         .spyOn(ReactGA, 'event')
//         .mockImplementation(() => {});
//
//     wrapper = shallow(<About {...props} />);
//
//     const resume = wrapper.find('.resume');
//     resume.simulate('click');
//     expect(wrapper.instance().analytics).toHaveBeenCalledWith(
//         'resume download'
//     );
//
//     const github = wrapper.find('.github');
//     github.simulate('click');
//     expect(wrapper.instance().analytics).toHaveBeenCalledWith('github');
//
//     expect(mockReactGA).toHaveBeenCalledTimes(2);
// });
// });

export default {};
