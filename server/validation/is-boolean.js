module.exports = value => {
  return (
    value === true ||
    value === false ||
    value === "true" ||
    value === "false"
  );
}
