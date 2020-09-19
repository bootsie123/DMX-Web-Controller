process.on("unhandledReject", warning => {
  console.warn(warning);
});

process.on("uncaughtException", err => {
  console.error(err);
});
