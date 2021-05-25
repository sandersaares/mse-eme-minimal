async function InitializeDrm(videoElement) {
    var config = [{
        videoCapabilities: [{ contentType: 'video/mp4; codecs="avc1.64001F"' }],
        audioCapabilities: [{ contentType: 'audio/mp4; codecs="mp4a.40.2"' }]
    }];

    var keySystemAccess = await navigator.requestMediaKeySystemAccess('org.w3.clearkey', config);

    var mediaKeys = await keySystemAccess.createMediaKeys();
    videoElement.setMediaKeys(mediaKeys);

    var keySession = mediaKeys.createSession();

    keySession.addEventListener("message", handleMessage, false);
    keySession.addEventListener("keystatuseschange", keyStatusChanged, false);

    // This initialization data is specific to W3C Clear Key.
    // DRM clients will have DRM-client-specific initialization data.
    // We inform the browser what key IDs we want to be available.

    var initData = '{"kids":["h9xcAKfKQjCQ8CmVq9nzvw", "CkCXcJ6hQNC5NzmGdYT-5g"]}';
    var initDataBuffer = new TextEncoder().encode(initData);

    console.info("Key loading begins.");

    // 'keyids' initialization data type is specific to W3C Clear Key.
    // When targeting DRM clients, we specify "cenc" here.
    await keySession.generateRequest('keyids', initDataBuffer);
}

async function keyStatusChanged(event) {
    var keyStatuses = event.target.keyStatuses;

    console.info("Keys loaded: " + keyStatuses.size);

    keyStatuses.forEach(item => {
        console.info("Key is: " + item);
    });
}

async function handleMessage(event) {
    var request = new TextDecoder().decode(event.message);
    console.info("Request: " + request);

    // List of keys in initData (request) should match list of keys here (response).
    // If we fail to provide keys for all loaded tracks here, playback will not start.
    var response = '{"keys":[{"kty":"oct","k":"wTv15KZkRq2EJOWQhxQnog","kid":"h9xcAKfKQjCQ8CmVq9nzvw"},{"kty":"oct","k":"OjOf9CpXfjPuqBiA8nVtdA","kid":"CkCXcJ6hQNC5NzmGdYT-5g"}],"type":"temporary"}';
    var responseBuffer = new TextEncoder().encode(response);

    console.info("Response: " + response);

    var keySession = event.target;
    await keySession.update(responseBuffer);

    console.info("Decryption keys configured.");
}