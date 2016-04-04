module.exports = function (client) {
  var LocalTodo = client.models.LocalTodo;
  var RemoteTodo = client.models.RemoteTodo;

  var since = { push: -1, pull: -1 };

  function sync() {

    LocalTodo.replicate(
      RemoteTodo,
      since.push,
      function pushed(err, conflicts, cps) {
        if (conflicts.length) handleConflicts(conflicts);

        since.push = cps;

        RemoteTodo.replicate(
          LocalTodo,
          since.pull,
          function pulled(err, conflicts, cps) {
            if (conflicts) {
              handleConflicts(conflicts.map(function (x) {return x.swapParties();}));
              since.pull = cps;
            }
          }
        )
      }
    )
  }

  LocalTodo.observe('after save', thenSync);
  LocalTodo.observe('after delete', thenSync);
  function thenSync(_, next) {
    next();
    sync(); // in background
  }

  function handleConflicts() {
    // TODO notify user about the conflicts
    
  }
};
