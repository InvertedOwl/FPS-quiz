const GIFEncoder = require('gif-encoder-2')
const { createCanvas } = require('canvas')
const { writeFile } = require('fs')

const size = 200
const half = size / 2

const canvas = createCanvas(size, size)
const ctx = canvas.getContext('2d')

function drawBackground() {
  ctx.fillStyle = '#081030'
  ctx.fillRect(0, 0, size, size)
}




function createGif(fps) {
    let radianSteps = 6 / fps;

    const encoder = new GIFEncoder(size, size)
    encoder.setDelay(500)
    encoder.start()
    encoder.setFrameRate(fps);
    let x = half + 25;
    let y = half + 25;
    ctx.fillStyle = '#ff0000';

    for (let i = 0; i < fps; i++) {
        drawBackground();
        ctx.fillStyle = 'purple';
        ctx.beginPath();
        ctx.ellipse(half, half, 60, 60, Math.PI / 4, 0, 2 * Math.PI);
        ctx.fill();

        let nx = Math.cos(i * radianSteps) * (x - half) - Math.sin(i * radianSteps)*(y-half) + half;
        let ny = Math.sin(i * radianSteps) * (x - half) + Math.cos(i * radianSteps)*(y-half) + half;

        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.ellipse(nx, ny, 20, 20, Math.PI / 4, 0, 2 * Math.PI);
        ctx.fill();
        encoder.addFrame(ctx);
        ctx.clearRect(0, 0, size, size)
    }

    encoder.finish()

    const buffer = encoder.out.getData()



    // writeFile(__dirname + '/fps' + fps + '.gif', buffer, error => {})
    return buffer;
}







const express = require('express')
const app = express()
const port = 3006

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

app.get('/newgif', (req, res) => {
    let fps = (Math.floor(Math.random() * 12) * 5) + 5
    let gif = Buffer.from(createGif(fps), 'base64');
    res.json({"gif":gif, "fps": fps})

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



createGif(10)
