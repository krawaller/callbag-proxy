function makeProxy(){
  let proxiedSource;
  let callbag = (start, sink) => {
    if (start !== 0 ) return;
    if (!proxiedSource) throw new Error("Sink attached to Proxy that isn't connected");
    proxiedSource(0, sink);
  }
  callbag.connect = source => proxiedSource = source;
  return callbag;
}

module.exports = makeProxy;
