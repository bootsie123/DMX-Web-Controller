const { workerData } = require("worker_threads");

require("../../actions/" + workerData.fileName).run(require("./DMX_API"));
