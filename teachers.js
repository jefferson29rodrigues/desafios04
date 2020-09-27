const fs = require('fs');
const data = require('./data.json')
const { age, date } = require('./utils')

// show


exports.show = function (req, res) {
    const id = req.params.id

    const teachersAll = data.teachers;

    const foundTeacher = teachersAll.find(element => id == element.id);

    if (!foundTeacher) return res.send("This Teacher no Exist!")

    const teacher = {
        ...foundTeacher,
        areaAtuacao: foundTeacher.areaAtuacao.split(","),
        birth: age(foundTeacher.birth),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at)        
    }
    
    return res.render('teachers/show', { teacher/*, id*/ })
}

// create
exports.post = function(req, res) {
    const keys = Object.keys(req.body)

    for(key of keys) {
        if (req.body[key] == "") {
            return res.send('Preencha todos os campos!')
        }
    }


    let { avatar_url, name, birth, escolaridade, tipoEnsino, areaAtuacao } = req.body

    //birth = Date.parse(birth)
    const id = Number(data.teachers.length + 1)
    const created_at = Date.now()

    //data.teachers.push(req.body);
    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        escolaridade,
        tipoEnsino,
        areaAtuacao,
        created_at
    });



    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("write file error!")
        
        return res.redirect("/teachers")
    });  
}

