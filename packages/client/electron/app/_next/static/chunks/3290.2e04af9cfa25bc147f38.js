!function(){var e;importScripts(location.origin+"/corto/corto.js",location.origin+"/corto/rangeFetcher.js");var t,r,a,o=-1;globalThis.onmessage=function(n){console.log("Received input: ",n.data),"initialize"===n.data.type&&function(n){var i=n.meshFilePath,f=n.numberOfKeyframes,s=n.fileHeader,m=new HttpRangeFetcher({});console.log("Range fetcher"),console.log(m),e=i,r=f,a=s,globalThis.postMessage({type:"initialized"}),t=setInterval((function(){o>=r&&(clearInterval(t),globalThis.postMessage({type:"complete"}));var n=++o,i=a.frameData[n];if(void 0===i)return console.log("Keyframe undefined");var f=a.frameData.filter((function(e){return e.keyframeNumber===n&&e.keyframeNumber!==e.frameNumber})).sort((function(e,t){return e.frameNumber<t.frameNumber})),s=i.startBytePosition,l=f.length>0?f[f.length-1].startBytePosition+f[f.length-1].meshLength-s:i.startBytePosition+i.meshLength-s;m.getRange(e,s,l).then((function(e){var t=i.meshLength,r=new CortoDecoder(e.buffer.buffer,0,t).decode(),a={keyframeBufferObject:{frameNumber:i.frameNumber,keyframeNumber:i.keyframeNumber,bufferGeometry:r}};globalThis.postMessage({type:"framedata",payload:a})}))}),1e3/60)}(n.data.payload)},_N_E={}}();