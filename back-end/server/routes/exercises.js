const exercisesController = require ('../controllers').exercises;

module.exports = (app) => {
    // rutas
    app.post('/api/exercise', exercisesController.createExercise);
    app.get('/api/exercises', exercisesController.getAllExercises);
    app.get('/api/exercise/:id', exercisesController.getExerciseById);
    app.put('/api/exercise/:id', exercisesController.updateExercise);
    app.delete('/api/exercise/:id', exercisesController.deleteExercise);
    app.post('/api/generate_options', exercisesController.generatePossibleAnswers);
    app.post('/api/validate_answer', exercisesController.validateAnswer);
}