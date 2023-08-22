const modelParams = {
    flipHorizontal: true, // Flip e.g for video
    ImageScaleFactor: 0.7, // Reduce input size for gains speed
    maxNumBoxes: 1, // Maximum number of boxes to detect
    iouThreshold: 0.5, // ioU threshold for non-max suppresion
    scoreThreshold: 0.79 // Confidence threshold for predictions
}

navigator.mediaDevices, getUserMedia(
    {
        video: true,
        audio: true
    }
)


const video = document.getElementById('video')
const audio = document.getElementById('audio')

let model = handTrack.load()

// const model = await handTrack.load()
// const predictions = await model.detect(video)

handTrack.startVideo(video).then(status => {
    if (status) {
        navigator.getUserMedia({ video: {} },
            stream => {
                video.srcObject = stream
                // Run our detection
                setInterval(runDetection, 100)
            },
            err => console.log(err)
        )
    }
})

function runDetection() {
    model.detect(video).then(predictions => {
        if (predictions.length !== 0) {
            let hand1 = predictions[0].bbox
            let x = hand1[0]
            let y = hand1[1]

            if (y > 300) {
                if (x < 200) {
                    audio.src = 'audio/a-chrod.wav'
                } else if (x > 400) {
                    audio.src = 'audio/e-chord.wav'
                } else if (x > 300) {
                    audio.src = 'audio/c-chrod.wav'
                } else if (x > 200) {
                    audio.src = 'audio/b-chord.wav'
                }
            }
            // Play the sound
            audio.play()
        }

    })
}

handTrack.load(modelParams).then(lmodel => {
    model = lmodel
})