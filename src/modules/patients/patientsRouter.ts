import express = require("express");
import {
    createPatient,
    getAllPatients,
    updatePatient,
    getPatient
} from "./patientsController";

const router = express.Router();

router.post("/", createPatient);
router.get("/", getAllPatients);
router.get("/:id", getPatient);
router.put("/:id", updatePatient);

const patientsRouter = router;

export default patientsRouter