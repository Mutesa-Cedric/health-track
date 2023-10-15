import express = require("express");
import {
    getAllRecords,
    getRecord,
    deleteRecord,
    updateRecord,
    getPatientRecords,
    createRecord
} from "./recordsController"

const router = express.Router();

router.post("/", createRecord);
router.get("/", getAllRecords);
router.get("/:id", getRecord);
router.get("/patient/:patient_id", getPatientRecords);
router.put("/:id", updateRecord);
router.delete("/:id", deleteRecord);


const recordsRouter = router;
export default recordsRouter;