const fs = require('fs');

module.exports.getAudio = (req, res) => {
    // github 
    // // Ensure there is a range given for the video
    // const range = req.headers.range;
    // if (!range) {
    //     res.status(400).send("Requires Range header");
    // }

    const { id } = req.params;
    if (!id) {
        res.status(400).send('Bad Request');
        return;
    }
    // get video stats (about 61MB)
    const audioPath = `./audio/CD1/${id}.mp3`;
    const audioSize = fs.statSync(audioPath).size;

    // Parse Range
    // Example: "bytes=32324-"
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, audioSize - 1);

    // Create headers
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${audioSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "audio/mpeg",
    };
    res.writeHead(206, headers);
    const audioStream = fs.createReadStream(audioPath, { start, end });
    audioStream.pipe(res);
}