import { createAction, handleActions } from "redux-actions";
import { taggedSum } from "daggy";

export const Maybe = taggedSum("Maybe", {
  Just: ["data"],
  Nothing: [],
});

export const Toggle = taggedSum("Toggle", {
  On: [],
  Off: [],
});

export const getTopStories = createAction("GET_TOP_STORIES");
export const getStoryItems = createAction("GET_STORY_ITEMS");
export const items = createAction("ITEMS");
export const error = createAction("ERROR");
export const getComments = createAction("GET_COMMENTS");
export const comments = createAction("COMMENTS");
export const toggleComments = createAction("TOGGLE_COMMENTS")

const INITIAL_STATE = {
  items: Maybe.Nothing,
  error: Maybe.Nothing,
  comments: {},
};

const formatStories = stories => stories.map(story => ({
    ...story,
    num_comments: story.kids && story.kids.length ? story.kids.length : 0,
    display_time: new Date(Number(`${story.time}000`)).toDateString()
  })
)

export const storiesReducer = handleActions(
  {
    ITEMS: (state, { payload }) => ({
      ...state,
      items: Maybe.Just(formatStories(payload)),
    }),
    COMMENTS: (state, { payload: { id, response } }) => ({
      ...state,
      comments: {
        ...state.comments,
        [id]: {
          items:
            response && response.length > 0
              ? Maybe.Just(response)
              : Maybe.Nothing,
          toggle: Toggle.Off,
        },
      },
    }),
    TOGGLE_COMMENTS: (state, { payload : {id} }) => ({
      ...state,
      comments: {
        ...state.comments,
        [id]: {
          ...state.comments[id],
          toggle: Toggle.On.is(state.comments[id].toggle) ? Toggle.Off : Toggle.On,
        },
      },
    }),
    ERROR:(state, { payload }) => ({
      ...state,
      error: Maybe.Just(payload)
    }),
  },
  INITIAL_STATE
);

export const reducer = {
  stories: storiesReducer,
};
