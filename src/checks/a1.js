export default {
  levels: [
    {
      tests: [
        {
          testFunc: (frame) => {
            return frame.querySelector("h1");
          },
          error: "Where did the h1 go??? Add an h1 with the h1 tags",
        },
        {
          testFunc: (frame) => {
            return frame.querySelector("h1")?.textContent === "I love HTML!";
          },
          error: "You haven't changed the content yet!",
        },
      ],
      instruction: 'Change the content in h1 to "I love HTML!"',
      defaultCode: {
        htmlCode: "<h1>Hi!</h1>",
        cssCode: "",
      },
    },
    {
      tests: [
        {
          testFunc: (frame) => {
            return frame.querySelector("h1");
          },
          error: "Where did the h1 go??? Add an h1 with the h1 tags",
        },
        {
          testFunc: (frame) => {
            console.log(
              getComputedStyle(frame.querySelector("h1"))?.getPropertyValue(
                "color"
              )
            );
            return (
              getComputedStyle(frame.querySelector("h1"))?.getPropertyValue(
                "color"
              ) === "rgb(255, 0, 0)"
            );
          },
          error:
            "The color of the h1 is still not red! Try selecting it in css using just 'h1'",
        },
      ],
      instruction: 'Give the h1 a color of red with css red"',
    },
  ],
};
