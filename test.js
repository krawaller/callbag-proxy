const test = require('tape');
const makeMockCallbag = require('callbag-mock');
const makeProxy = require('./index');

test('it correctly proxies a source', tape => {
  let history = [];
  const reporter = (name,dir,t,d) => t !== 0 && history.push([name,dir,t,d]);

  const source = makeMockCallbag('source', true);
  const proxy = makeProxy();

  tape.throws(() => proxy(0, sink), 'we get error if we attach sink to unconnected proxy');

  proxy.connect(source);

  const sink = makeMockCallbag('sink', reporter);

  proxy(0, sink);

  source.emit(1, 'foo');

  tape.deepEqual(history, [
    ['sink', 'body', 1, 'foo'],
  ], 'sink gets data from source via proxy');

  tape.end();
});
