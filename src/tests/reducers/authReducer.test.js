import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe("Tests on authReducer", () => {
  test("Should to do the login", () => {
    const initState = {};

    const action = {
      type: types.login,
      payload: {
        uid: "abc",
        displayName: "Fernando",
      },
    };

    const state = authReducer(initState, action);

    expect(state).toEqual({
      uid: "abc",
      name: "Fernando",
    });
  });

  test("Should to do the  logout", () => {
    const initState = {
      uid: "jagdfjahdsf127362718",
      name: "Fernando",
    };

    const action = {
      type: types.logout,
    };

    const state = authReducer(initState, action);

    expect(state).toEqual({});
  });

  test("Should not to do make changes in the  state", () => {
    const initState = {
      uid: "jagdfjahdsf127362718",
      name: "Fernando",
    };

    const action = {
      type: "asdjkasd",
    };

    const state = authReducer(initState, action);

    expect(state).toEqual(initState);
  });
});
