const test = require('tape');
const makeMockCallbag = require('callbag-mock');
const makeProxy = require('./index');

test('it correctly proxies a source', t => {

  const source = makeMockCallbag(true);
  const proxy = makeProxy();
  const sink = makeMockCallbag();

  t.throws(() => proxy(0, sink), 'we get error if we attach sink to unconnected proxy');

  proxy.connect(source);
  proxy(0, sink);

  source.emit(1, 'foo');
  t.deepEqual(sink.getReceivedData(), ['foo'], 'sink gets data from source via proxy');

  sink.emit(2);
  t.ok(!source.checkConnection(), 'proxy passed messages along upstream too');

  t.end();
});
