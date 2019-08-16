import {
  storiesReducer,
  items,
  error,
  comments,
  toggleComments,
  Toggle,
  Maybe,
} from "../src/reducer";

const storiesFixture = [
  {
    by: "RickJWagner",
    descendants: 257,
    id: 20711498,
    kids: [20712902, 20711712, 20711591, 20711731],
    score: 579,
    time: 1565920389,
    title: "Tasty Seaweed Reduces Cows’ Methane Emissions by 99%",
    type: "story",
    url:
      "https://www.goodnewsnetwork.org/gamechanging-pink-seaweed-reduces-cow-emissions/",
  },
  {
    by: "djsumdog",
    descendants: 10,
    id: 20713886,
    kids: [20714104, 20714249, 20714243, 20714242, 20714317, 20714259],
    score: 28,
    time: 1565953227,
    title: "Twitter locked my account for a nine year old tweet",
    type: "story",
    url:
      "https://fightthefuture.org/article/twitter-is-trying-to-erase-the-past/",
  },
];

const commentsFixture = [
  {
    by: "giacaglia",
    id: 20716291,
    kids: [20716509],
    parent: 20716071,
    text:
      "For people that are interested in Nvidia and AMD&#x27;s strategy, there is an interesting podcast about it.",
    time: 1565970198,
    type: "comment",
  },
  {
    by: "waitwhatwhere",
    id: 20717083,
    kids: [20717248],
    parent: 20716071,
    text: "For those that prefer to avoid TC.",
    time: 1565974716,
    type: "comment",
  },
];

describe("Reducer Actions Test", () => {
  it("Reducer Action: items", done => {
    const state = storiesReducer(undefined, items(storiesFixture));
    expect(Maybe.Just.is(state.items)).toBe(true);
    state.items.cata({
      Just: data => {
        expect(data[0].by).toEqual("RickJWagner");
        expect(data[0].num_comments).toEqual(4);
        expect(data[1].display_time).toEqual("Fri Aug 16 2019");
        expect(data[1].by).toEqual("djsumdog");
        expect(data[1].num_comments).toEqual(6);
        expect(data[1].display_time).toEqual("Fri Aug 16 2019");
      },
      Nothing: () => done.fail(),
    });

    done();
  });

  it("Reducer Action: comments", done => {
    const state = storiesReducer(
      undefined,
      comments({ id: 20716071, response: commentsFixture })
    );

    expect(Maybe.Just.is(state.comments[20716071].items)).toBe(true);
    expect(Toggle.Off.is(state.comments[20716071].toggle)).toBe(true);
    state.comments[20716071].items.cata({
      Just: data => {
        expect(data[0].by).toEqual("giacaglia");
        expect(data[1].by).toEqual("waitwhatwhere");
      },
      Nothing: () => done.fail(),
    });

    done();
  });

  it("Reducer Action: toggleComments", () => {
    const state = storiesReducer(
      { comments: { 20716071: { items: Maybe.Just({}), toggle: Toggle.Off } } },
      toggleComments({ id: 20716071 })
    );

    expect(Toggle.On.is(state.comments[20716071].toggle)).toBe(true);
  });

  it("Reducer Action: error", done => {
    const state = storiesReducer(undefined, error(`Something went wrong`));
    expect(Maybe.Just.is(state.error)).toBe(true);
    state.error.cata({
      Just: message => expect(message).toEqual("Something went wrong"),
      Nothing: () => done.fail(),
    });

    done();
  });
});
