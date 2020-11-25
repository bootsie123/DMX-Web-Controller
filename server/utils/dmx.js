const utils = {
  mapToMode: (mode, dmx) => {
    if (mode === 4) {
      return utils.mapTo4Chan(dmx);
    } else if (mode === 26) {
      return utils.mapTo26Chan(dmx);
    } else {
      return dmx;
    }
  },
  mapTo4Chan: dmx => {
    const newDMX = new Array(4);

    for (let i = 0; i < 4; i++) {
      newDMX[i] = dmx[i];
    }

    newDMX[newDMX.length - 1] = dmx[dmx.length - 1];

    return newDMX;
  },
  mapTo26Chan: dmx => {
    const newDMX = new Array(26);

    for (let i = 0; i < 24; i++) {
      newDMX[i] = dmx[i % 3];
    }

    newDMX[newDMX.length - 1] = dmx[dmx.length - 1];

    return newDMX;
  }
};

module.exports = utils;
