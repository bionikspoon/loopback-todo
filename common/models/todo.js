module.exports = function (Todo) {
  Todo.handleChangeError = err => {
    console.warn('Cannot update change records for Todo:', err);
  };
};
