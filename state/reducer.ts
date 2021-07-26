import * as actions from "./actions";
import { addDepositRecord } from "../services/firestore";

const initialState = {
  user: { name: null, uid: null, reward: 0 },
  coordinates: null,
  location: null,
  form: {
    dropoffPoint: null,
    recycledObject: null,
    beforeImage: null,
    afterImage: null,
  },
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case actions.LOGIN:
      return {
        ...state,
        user: { ...state.user, name: action.userName, uid: action.uid },
      };
    case actions.LOGOUT:
      return {
        ...state,
        user: { name: null, uid: null },
      };
    case actions.LOAD_LOGGED_IN:
      return {
        ...state,
        user: { name: action.userName, uid: action.uid },
      };
    case actions.SELECT_LOCATION:
      console.log(action.location);
      return {
        ...state,
        coordinates: action.coordinates,
        location: action.location,
      };
    case actions.DEPOSIT_FORM:
      console.log(action);
      return {
        ...state,
        form: {
          dropoffPoint: action.dropoffPoint,
          recycledObject: action.recycledObject,
          beforeImage: action.beforeImage,
        },
      };
    case actions.DEPOSIT_CONFIRM:
      console.log(action);
      console.log(state);
      return {
        ...state,
        form: {
          ...state.form,
          afterImage: action.afterImage,
        },
      };
    case actions.SUBMIT_FORM:
      console.log(state);
      addDepositRecord(
        state.user.uid,
        state.form.dropoffPoint,
        state.form.recycledObject,
        state.form.beforeImage,
        state.user.reward
      );
      return {
        ...state,
        form: {},
      };
    case actions.READ_REWARD:
      console.log(action.reward);
      return {
        ...state,
        user: {
          ...state.user,
          reward: action.reward,
        },
      };
    default:
      return state;
  }
};
