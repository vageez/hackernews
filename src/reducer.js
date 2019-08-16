import { createAction, handleActions } from "redux-actions";
import { taggedSum } from "daggy";

export const Maybe = taggedSum("Maybe", {
  Just: ["data"],
  Nothing: [],
});

export const getTopStories = createAction("GET_TOP_STORIES");
export const getStoryItems = createAction("GET_STORY_ITEMS");
export const items = createAction("ITEMS");
export const error = createAction("ERROR");
export const getComments = createAction("GET_COMMENTS");
export const comments = createAction("COMMENTS");

const INITIAL_STATE = {
  items: Maybe.Nothing,
  comments: {},
};

export const storiesReducer = handleActions(
  {
    ITEMS: (state, { payload }) => ({
      ...state,
      items: Maybe.Just(payload),
    }),
    COMMENTS: (state, { payload: { id, response } }) => ({
      ...state,
      comments: {
        ...state.comments,
        [id]: response && response.length > 0 ? Maybe.Just(response) : Maybe.Nothing,
      },
    }),
  },

  INITIAL_STATE
);

export const reducer = {
  stories: storiesReducer,
};
