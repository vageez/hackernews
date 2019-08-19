import { createAction, handleActions } from "redux-actions";
import {
  elems,
  set,
  modifyOp,
  transform,
  ifElse,
  seq,
  identity,
} from "partial.lenses";
import { taggedSum } from "daggy";

export const Maybe = taggedSum("Maybe", {
  Just: ["data"],
  Nothing: [],
});

export const Toggle = taggedSum("Toggle", {
  On: [],
  Off: [],
});

export const Status = taggedSum("Status", {
  Yes: [],
  No: [],
});

export const getTopStories = createAction("GET_TOP_STORIES");
export const getStoryItems = createAction("GET_STORY_ITEMS");
export const items = createAction("ITEMS");
export const error = createAction("ERROR");
export const getComments = createAction("GET_COMMENTS");
export const toggleComments = createAction("TOGGLE_COMMENTS");
export const addComments = createAction("ADD_COMMENTS");

const INITIAL_STATE = {
  items: Maybe.Nothing,
  error: Maybe.Nothing,
};

const formatStories = stories =>
  stories.map(story => ({
    ...story,
    num_comments: story.kids && story.kids.length ? story.kids.length : 0,
    hasComments: story.kids && story.kids.length ? Status.Yes : Status.No,
    kids: story.kids ? story.kids.slice(0, 20) : null,
    comments: [],
    comments_requested: Status.No,
    display_comments: Toggle.Off,
    display_time: new Date(Number(`${story.time}000`)).toDateString(),
  }));

const addCommentsToStory = id => comments => items =>
  transform(
    [
      elems,
      ifElse(
        item => item.id === id, //?
        seq(
          modifyOp(item =>
            set(
              "display_comments",
              Toggle.On.is(item.display_comments) ? Toggle.Off : Toggle.On,
              item
            )
          ),
          modifyOp(set("comments_requested", Status.Yes)),
          modifyOp(set("comments", comments))
        ),
        identity
      ),
    ],
    items
  );

const toggleItemComments = id => items =>
  transform(
    [
      elems,
      ifElse(
        item => item.id === id,
        modifyOp(item =>
          set(
            "display_comments",
            Toggle.On.is(item.display_comments) ? Toggle.Off : Toggle.On,
            item
          )
        ),
        identity
      ),
    ],
    items
  );

export const storiesReducer = handleActions(
  {
    ITEMS: (state, { payload }) => ({
      ...state,
      items: Maybe.Just(formatStories(payload)),
    }),
    ADD_COMMENTS: (state, { payload: { id, response } }) => ({
      ...state,
      items: state.items.cata({
        Just: items => Maybe.Just(addCommentsToStory(id)(response)(items)),
        Nothing: Maybe.Nothing,
      }),
    }),
    TOGGLE_COMMENTS: (state, { payload: { id } }) => ({
      ...state,
      items: state.items.cata({
        Just: items => Maybe.Just(toggleItemComments(id)(items)),
        Nothing: Maybe.Nothing,
      }),
    }),
    ERROR: (state, { payload }) => ({
      ...state,
      error: Maybe.Just(payload),
    }),
  },
  INITIAL_STATE
);

export const reducer = {
  stories: storiesReducer,
};
