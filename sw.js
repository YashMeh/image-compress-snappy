var window = self;
importScripts("./snappyjs.js");

addEventListener("install", function (event) {
  event.waitUntil(console.log("service worker installed successfully"));
});

addEventListener("fetch", function (event) {
  // Get the request
  var request = event.request;

  // HTML files
  // Network-first
  // console.log("This is request", request);
  if (request.url === "http://localhost:8080/img") {
    event.respondWith(
      (async function () {
        var promisesArr = [];

        const cResponse = await fetch(
          "http://localhost:8080/compress/img"
        ).catch((err) => {
          console.log("ERROR in SW", err);
        });
        promisesArr.push(cResponse);
        //Convert ReadableStream to ArrayBuffer
        var cImgBlobBuf = await cResponse.arrayBuffer();
        promisesArr.push(cImgBlobBuf);
        //Wait until all conversions are success
        event.waitUntil(Promise.all(promisesArr));
        //Decompress
        var uncompressedBuffer = SnappyJS.uncompress(cImgBlobBuf);
        var uncompressedBufferUint = new Uint8Array(uncompressedBuffer);
        var imageBlob = new Blob([uncompressedBufferUint], {
          type: cResponse.headers.get("Content-Type"),
        });
        return new Response(imageBlob, {
          headers: {
            "Content-Type": "image/jpeg",
          },
        });
      })()
    );
  }
  return;
});
