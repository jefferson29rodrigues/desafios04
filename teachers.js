const fs = require('fs');
const data = require('./data.json');
const { age, date, desde } = require('./utils');

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
        created_at: desde(foundTeacher.created_at)        
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

    birth = Date.parse(birth)
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

exports.edit = function(req, res) {
    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teach) {
        return id == teach.id
    })

    if (!foundTeacher) return res.send("This teacher no Exist!")

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth)
    }

    console.log(teacher)

    return res.render('teachers/edit', { teacher })
}

// update

exports.put = function(req, res) {
    const { id } = req.body
    index = 0

    const foundTeacher = data.teachers.find(function(teacher, foundIndex) {
        if (id == teacher.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundTeacher) return res.send("Instructor not found!")

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }
    
    data.teachers[index] = teacher

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write error!")

        return res.redirect(`/teachers/${id}`)
    })
}

// delete

exports.delete = function(req, res) {
    const { id } = req.body

    const filteredTeachers = data.teachers.filter(function(teacher) {
        return teacher.id != id
    })

    data.teachers = filteredTeachers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error!")
    
        return res.redirect("/teachers")
    })
}