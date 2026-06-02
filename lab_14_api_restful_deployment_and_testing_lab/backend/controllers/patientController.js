const Patient = require("../models/Patient");

/* CREATE */
exports.createPatient = async (req, res, next) => {
    try {
        const { name, age, disease, contact } = req.body;
        if (!name || age === undefined || !disease || !contact) {
            return res.status(400).json({ message: "All fields are required (name, age, disease, contact)" });
        }
        const patient = await Patient.create({ name, age, disease, contact });
        res.status(201).json(patient);
    } catch (error) {
        next(error);
    }
};

/* GET ALL */
exports.getPatients = async (req, res, next) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (error) {
        next(error);
    }
};

/* GET ONE */
exports.getPatient = async (req, res, next) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.json(patient);
    } catch (error) {
        next(error);
    }
};

/* UPDATE */
exports.updatePatient = async (req, res, next) => {
    try {
        const patient = await Patient.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.json(patient);
    } catch (error) {
        next(error);
    }
};

/* DELETE */
exports.deletePatient = async (req, res, next) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.json({ message: "Patient deleted" });
    } catch (error) {
        next(error);
    }
};
