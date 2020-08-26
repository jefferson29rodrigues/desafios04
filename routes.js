const express = require('express');
const routes = express.Router();

routes.get("/", function(req, res) {
    return res.redirect('/teachers');

    /*
    const data = {
        avatar_url: "https://avatars3.githubusercontent.com/u/56448216?s=460&u=1f9b2a4004c9f27b80d09972434aad64e7eca7d8&v=4",
        name: "Jefferson Rodrigues",
        role: "Aluno - Rocketseat",
        description: 'Programador iniciante focado em Desenvolvimento Web, além de produtor de conteúdo no <a href="https://www.youtube.com/channel/UCceXcxMnE8RpAZCgKlis3Ig" target="_blank">youtube</a> para auxiliar quem também está começando',
        links: [
            { name: "Github", url: "https://github.com/jefferson29rodrigues" },
            { name: "Linkedin", url: "https://www.linkedin.com/in/jeffersonrodrigues29/" },
            { name: "Youtube", url: "https://www.youtube.com/channel/UCceXcxMnE8RpAZCgKlis3Ig" },
            { name: "Twitter", url: "https://twitter.com/jefferson_pqd2" }
        ]
    };

    return res.render("index", { data: data });
    */
});

routes.get("/teachers", function(req, res) {
    return res.render('teachers/index')
    
    /*
    return res.render("portifolio", { items: videos });
    */
});

routes.get("/students", function(req, res) {
    return res.send('Você está na página students!')
    
    /*
    return res.render("layout");
    */
});

/*
server.get("/video", function(req, res) {  
        
    const id = req.query.id;

    const video = videos.find(function(video) {
        return video.id == id;

        /*
        if (video.id == id) {
            return true;
        }
        * /
    });

    if (!video) {
        return res.send("Video not found!");
    }

    return res.render("video", { item: video });    
});
*/

module.exports = routes;