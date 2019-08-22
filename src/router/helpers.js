export const ChainGuards = (guardsList = []) => {
  function chain (guards, from, to, lastNext, i = 0) {
    const guard = guards[i];
    if (guards.length === i + 1) {
      guard(from, to, lastNext);
    } else {
      guard(from, to, nextArg => {
        typeof nextArg === 'undefined' ? chain(guards, from, to, lastNext, i + 1) : lastNext(nextArg);
      });
    }
  }
  return (from, to, next) => chain(guardsList, from, to, next, 0);
};
