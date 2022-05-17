### Description

This is a POC that uses snappy to compress/decompress images to save user's bandwidth, it uses a service worker to intercept all image requests to the server and redirects to download a compressed version of the image and decompress on the client side, both using snappy.

You can plug in any image-compress algorithm you want and try.

#### Benchmarks [WIP]

| No. of image req. | Without snappy | With snappy |
| ----------------- | :------------: | ----------: |
| 500               |     4.4 MB     |      4.2 MB |

#### How to run

1. Install the dependencies and run the server using

```js
node server.js
```

2. Download the `snappyjs.js` from [dist/snappyjs.js](https://github.com/zhipeng-jia/snappyjs/tree/master/dist)

3. Run `index.html` using a simple http server

4. Check the bytes transferred using Chrome DevTools
