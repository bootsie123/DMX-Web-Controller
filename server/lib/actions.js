const fs = require("fs");
const { Worker } = require("worker_threads");

const actionFiles = fs.readdirSync(__dirname + "/../../actions");
const actions = [];

let runningAction = {};

for (let i in actionFiles) {
  try {
    const action = require("../../actions/" + actionFiles[i]);

    action.id = i;
    action.fileName = actionFiles[i];

    actions.push(action);
  } catch (err) {
    console.error(`Error loading action ${actionFiles[i]}:`, err);
  }
}

exports.getActions = () => {
  return actions;
};

exports.getActionById = actionId => {
  return actions[actionId];
};

exports.hasAction = actionId => {
  return !!actions[actionId];
};

exports.runAction = actionId => {
  const io = require("./sockets").io();
  const action = actions[actionId];

  if (action.worker) return;

  if (runningAction.id) {
    runningAction.worker.once("exit", () => {
      this.runAction(actionId);
    });

    return this.stopAction(runningAction.id);
  }

  const worker = new Worker(__dirname + "/ActionWorker.js", { workerData: { fileName: action.fileName } });

  action.worker = worker;
  runningAction = action;

  if (io) {
    io.of("/").to("authenticated").emit("action_started", actionId);
  }

  worker.on("exit", () => {
    delete action.worker;

    if (runningAction.id === action.id) {
      runningAction = {};
    }

    if (io) {
      io.of("/").to("authenticated").emit("action_ended", actionId);
    }
  });

  worker.on("error", err => {
    console.error(`ACTION ERROR: ${action.name} |`, err);
  });
};

exports.stopAction = actionId => {
  const action = actions[actionId];

  if (action.worker) {
    action.worker.terminate();
  }
};

exports.actionToJSON = action => {
  return {
    id: action.id,
    name: action.name,
    style: action.style,
    running: !!action.worker
  };
};
