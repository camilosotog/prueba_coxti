const exercises = require ('../models').exercise;

function createExercise(req, res) {
    // se usa el metodo 'create' de sequelize y se crea nuevo registro con el equema definido en el modelo
    exercises.create(req.body)
    .then(exercise => {
        // se envia una respuesta satisfactoria con el objeto creado
        res.status(200).send({exercise});
    }).catch(err => {
        // se envia una respuesta con el nombre del error generado
        res.status(500).send({err});
    })
}

function updateExercise(req, res){
    var id = req.params.id;
    var body = req.body;
    // se usa findByPk que es metodo de sequelize para buscar un objeto por su id
    exercises.findByPk(id)
    .then(exercise => {
        // se actualiza con el metodo update de sequelize
        exercise.update(body)
        .then(()=>{
            // se envia una respuesta satisfactoria con el objeto creado
            res.status(200).send({exercise});
        })
        .catch(err => {
            // se envia una respuesta con el nombre del error
            res.status(500).send({message:"ocurrio un eror al actualizar ejercicio"});
        })
    })
    .catch(err => {
        // se envia una respuesta con el nombre del error
        res.status(500).send({message:"Ocurrio un error al buscar el ejercicio"});
    });
}

function deleteExercise(req, res) {
    // metodo destroy de sequelize es usado para eliminar un registro encontrado por su id
    exercises.destroy({ where: {
        id: req.params.id }
      })
    .then(exercise => {
        // se envia una respuesta satisfactoria con el objeto creado
        res.status(200).send({exercise});
    })
    .catch(err =>{
        // se envia una respuesta con el nombre del error
        res.status(500).send({message:"Ocurrio error al borrar ejercicio"});
    })
}

function getAllExercises(req, res) {
    // metodo findAll de sequelize retorna todos los registros creados
    exercises.findAll({
        // se ordenan de forma ascendente por su id
        order:[
            ['id','ASC']
        ]
    })
    .then(exercises => {
        // se envia una respuesta satisfactoria con el objeto creado
        res.status(200).send({exercises});
    })
    .catch(err => {
        // se envia una respuesta con el nombre del error
        res.status(500).send({message:"Ocurrio un error al buscar los ejercicios"});
    })
}

function getExerciseById(req, res){
    var id = req.params.id;
    // se busca con el metodo de sequelize findByPk por el id
    exercises.findByPk(id)
    .then(exercise => {
        // se envia una respuesta satisfactoria
        res.status(200).send({exercise});
    })
    .catch(err => {
        // se envia una respuesta con el nombre del error
        res.status(500).send({message:"Ocurrio un error al buscar un ejercicio"});
    })
}

function generatePossibleAnswers(req, res) {
    // metodo que define las posibles respuestas aleatorias
    var id;
    var optionA; 
    var optionB;
    var optionC;
    var correctAnswer;
    const range = parseInt(Math.random() * (10 - 1) + 1);           // variable que define un rango aleatorio
    const optionSelect = parseInt(Math.random() * (4 - 1) + 1);// var con valor aleatorio de opcion de respuesta
    const min = parseInt(req.body.value - range);
    const max = parseInt(req.body.value + range);
    const rangeDifference = max - min;
    // se define los rangos segun la opcion de respuesta que sea la correcta (a o b o c)
    if (optionSelect == 1) {
        optionA = min + ' <> ' + max;
        optionB = (max + 1) + ' <> ' + (max + (rangeDifference));
        optionC = (max + (rangeDifference) + 1) + ' <> ' + (max + (rangeDifference * 3));
        correctAnswer = 'a';
    } else if (optionSelect == 2) {
        optionA = ((min - 1) - (rangeDifference / 2)) + ' <> ' + (min - 1);
        optionB = min + ' <> ' + max;
        optionC = (max + 1) + ' <> ' + (max + rangeDifference + 1);
        correctAnswer = 'b';
    } else {
        optionA = ((min + 3) - (rangeDifference * 2)) + ' <> ' + ((min + 3) - (rangeDifference));
        optionB = ((min - 1) - (rangeDifference / 2) + 1) + ' <> ' + (min - 1);
        optionC = min + ' <> ' + max;
        correctAnswer = 'c';
    }
    req.body.answer = correctAnswer;
    // se crea un nuevo registro en bd con el metodo create de sequelize
    exercises.create(req.body)
    .then(exercise => {
        id = exercise.id;
        res.status(200).send({optionA, optionB, optionC, correctAnswer, optionSelect, rangeDifference, id});
    }).catch(err => {
        res.status(500).send({err});
    })
}

function validateAnswer(req, res) {
    // metodo que valida si la respuesta ingresada es correcta o incorrecta (true/ false)
    var id = req.body.id;
    var validate = false;
    // se busca registro por su id
    exercises.findByPk(id)
    .then(exercise => {
        // se valida si la respuesta ingresada es igual a la que se guardo en la bd y retorna true
        if (exercise.answer == req.body.answer) {
            validate = true;
            res.status(200).send({validate});
        } else {
            // retorna false
            validate = false;
            res.status(200).send({validate});
        }
    })
    .catch(err => {
        res.status(500).send({message:"Ocurrio un error al buscar un ejercicio"});
    })
}


module.exports = {
    createExercise,
    updateExercise,
    getAllExercises,
    getExerciseById,
    deleteExercise,
    generatePossibleAnswers,
    validateAnswer
}