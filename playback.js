async function InitializePlayer() {
    var videoElement = document.getElementById("videoElement");

    var mediaSource = new MediaSource();

    // Load keys before we attach the media source, so keys are ready to go ASAP.
    await InitializeDrm(videoElement);

    videoElement.src = window.URL.createObjectURL(mediaSource);

    var videoSegments = [
        "media/video-cbcs/init.mp4",
        "media/video-cbcs/media.mp4"
    ];

    var audioSegments = [
        "media/audio-cbcs/init.mp4",
        "media/audio-cbcs/media.mp4"
    ];

    // Register one loader for video, one for audio.
    mediaSource.addEventListener('sourceopen', function() {
        LoadTrack(videoSegments, 'video/mp4; codecs="avc1.64001F"');
    });

    mediaSource.addEventListener('sourceopen', function() {
        LoadTrack(audioSegments, 'audio/mp4; codecs="mp4a.40.2"');
    });

    function LoadTrack(segmentList, codecString) {
        // We iterate the above list and load them one by one.
        var segmentIndex = 0;

        var sourceBuffer = mediaSource.addSourceBuffer(codecString);
        sourceBuffer.addEventListener('updateend', enqueueNextSegment);

        enqueueNextSegment();

        function enqueueNextSegment() {
            HttpGet(segmentList[segmentIndex], function (segment) {
                sourceBuffer.appendBuffer(new Uint8Array(segment));
            });

            segmentIndex++;

            if (segmentIndex >= segmentList.length) {
                console.info("Loaded final segment for " + codecString);
                sourceBuffer.removeEventListener('updateend', enqueueNextSegment);
            }
        }
    }
}

function HttpGet(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'arraybuffer';

    xhr.onload = function (e) {
        if (xhr.status != 200) {
            console.warn('Unexpected status code ' + xhr.status + ' for ' + url);
            return false;
        }
        callback(xhr.response);
    };

    xhr.send();
}