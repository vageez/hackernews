import { tryP, parallel } from "fluture";
import axios from "axios";
import { getTopStories, getStoryItems, items, error, getComments, addComments } from "Reducer";
import { URL_TOP_STORIES, URL_ITEM } from "./const";

const getTopStoriesRequest = () => tryP(() => axios.get(URL_TOP_STORIES));
const getItemRequest = item_id =>
  tryP(() => axios.get(URL_ITEM.replace("ITEM_ID", item_id)))
  .map(({ data }) => data);

const getTopStoriesEpic = {
  type: getTopStories.toString(),
  do: () =>
    getTopStoriesRequest()
      .map(({ data }) => getStoryItems(data))
      .mapRej(() => error(`getTopStoriesEpic`)),
};

const getStoryItemsEpic = {
  type: getStoryItems.toString(),
  do: ({ payload }, _) =>
    parallel(Infinity, payload.slice(0, 10).map(getItemRequest))
      .map(items)
      .mapRej(() => error(`getStoryItemsEpic`)),
};

const getCommentsEpic = {
    type: getComments.toString(),
    do: ({ payload: { kids, id } }, _) =>
      parallel(Infinity, kids.map(getItemRequest))
        .map(response => addComments({id, response}))
        .mapRej(() => error(`getCommentsEpic`)),
  };

export const epics = [getTopStoriesEpic, getStoryItemsEpic, getCommentsEpic];
