// Require les modules
const path = require('path');
const express = require('express');
const fs = require('fs'); //on require file controller

// Crée le serveur web avec express
const app = express();

//Il faudra lier le controller et le server.js
//
//

// Lie la route principal au dossier public puis cherche le index.html
app.use(express.static(path.join(__dirname, 'public')));

//La ligne du dessous n'est pas indispenssable car la ligne du dessus va cherche seule index.html dans public
//On fait un appel syncrone MAIS avant l'initialisation donc "ca passe" --> On lie index.html avec accueilFile
//const accueilFile = fs.readFileSync('./index.html') 

app.get("/video8k", (req, res) => {
    const range = req.headers.range;
    if(!range) {
        res.status(400).send("Requires range header");
    }

    const videoPath = "./assets/8K_VIDEO_ULTRAHD_120FPS.webm";
    const videoSize = fs.statSync(videoPath).size;

    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/webm",
  };

  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
})

app.get("/video720p", (req, res) => {
    const range = req.headers.range;
    if(!range) {
        res.status(400).send("Requires range header");
    }

    const videoPath = "./assets/720P_VIDEO_ULTRAHD_120FPS.mp4";
    const videoSize = fs.statSync(videoPath).size;

    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
})

// On lie le html de la vidéo 8k à video8kFile
const video8kFile = fs.readFileSync('./public/video1.html');

// On lie le html de la vidéo 720p à video720pFile
// const video720pFile = fs.readFileSync('./public/video2.html');

//on appelle video8kFile qui lie le fichier html et donc l'affiche sur la route qu'on donne au app.get
function video8kController(req, res){
    res.end(video8kFile);
}

//on appelle video720pFile qui lie le fichier html et donc l'affiche sur la route qu'on donne au app.get
// function video720pController(req, res){
//     res.end(video720pFile);
// }

//req, res sont demandés par express donc on les met en paramètre
//on initialise la route de la vidéo 8k avec "/video8k" sur un get (même route que dans la navbar)
app.get('/video8k', video8kController);

//on initialise la route de la vidéo 8k avec "/video8k" sur un get (même route que dans la navbar)
// app.get('/video720p', video720pController);


// Initialise le port à 3000
const PORT = 3000 || process.env.PORT;

// Le serveur écoute sur le port initialisé précédemment & console.log via un callback l'url
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT} \nApp running at:\n- Local: http://localhost:${PORT}/`));