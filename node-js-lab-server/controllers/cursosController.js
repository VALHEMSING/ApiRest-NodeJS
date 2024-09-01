

const Curso = require('../models/cursos_models'); // Asegúrate de que este modelo exista
const cursoValidationSchema = require('../validations/cursoValidations'); // Asegúrate de que esta validación exista

// Listar todos los cursos
const listarCursos = async (req, res) => {
    try {
        const cursos = await Curso.find();
        res.json(cursos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo curso
const crearCurso = async (req, res) => {
    const { error } = cursoValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const curso = new Curso(req.body);
        const nuevoCurso = await curso.save();
        res.status(201).json(nuevoCurso);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un curso por ID
const actualizarCurso = async (req, res) => {
    const { error } = cursoValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const curso = await Curso.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!curso) return res.status(404).json({ message: 'Curso no encontrado' });
        res.json(curso);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un curso por ID
const eliminarCurso = async (req, res) => {
    try {
        const curso = await Curso.findByIdAndDelete(req.params.id);
        if (!curso) return res.status(404).json({ message: 'Curso no encontrado' });
        res.json({ message: 'Curso eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    listarCursos,
    crearCurso,
    actualizarCurso,
    eliminarCurso
};
