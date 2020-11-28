module.exports = {
  name: "Example",
  style: {
    icon: "ri-home-2-line",
    iconColor: "",
    fontColor: "",
    background: ""
  },
  run: DMX_API => {
    let i = 0;

    setInterval(() => {
      if (i % 2 === 0) {
        DMX_API.send([255, 0, 0, 255]);
      } else {
        DMX_API.send([0, 255, 0, 255]);
      }

      i++;
    }, 2000);
  }
};
