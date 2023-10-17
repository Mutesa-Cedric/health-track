import db from "../../utils/db";
import Patient from "./patientModel";
import { Request, Response } from "express";

export const createPatient = async (req: Request, res: Response) => {
    try {
        const { name, national_id, frequent_disease } = req.body;
        if (!name || !national_id || !frequent_disease) {
            return res.status(400).json({
                message: "Bad request", missingFields: {
                    name: !name,
                    national_id: !national_id,
                    frequent_disease: !frequent_disease
                }
            });
        }

        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;
        db.run(
            `INSERT INTO patients (name, national_id,frequent_disease, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?)`,
            [name, national_id, frequent_disease, createdAt, updatedAt],
            function (err) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ message: "Internal server error", error: err });
                }

                const id = this.lastID;
                const patient: Patient = {
                    id,
                    name,
                    frequent_disease,
                    national_id,
                    createdAt,
                    updatedAt
                }
                return res.status(201).json({ message: "Patient created successfully", patient });
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error });
    }
}


export const getAllPatients = async (req: Request, res: Response) => {
    try {
        db.all("SELECT * FROM patients", (err, rows) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Internal server error", error: err });
            }

            const patients: Patient[] = rows as Patient[];
            return res.status(200).json({ message: "Patients retrieved successfully", patients });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error });
    }
}

export const updatePatient = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, national_id ,frequent_disease} = req.body;
        if (!name || !national_id) {
            return res.status(400).json({
                message: "Bad request", missingFields: {
                    name: !name,
                    national_id: !national_id
                }
            });
        }

        const updatedAt = new Date().toISOString();
        db.run(
            `UPDATE patients SET name = ?, national_id = ?,frequent_disease = ?, updatedAt = ? WHERE id = ?`,
            [name, national_id,frequent_disease, updatedAt, id],
            function (err) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ message: "Internal server error", error: err });
                }

                const patient: Patient = {
                    id: parseInt(id),
                    name,
                    national_id,
                    frequent_disease,
                    createdAt: "",
                    updatedAt
                }
                return res.status(200).json({ message: "Patient updated successfully", patient });
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error });
    }
}

export const getPatient = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        db.get("SELECT * FROM patients WHERE id = ?", [id], (err, row) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Internal server error", error: err });
            }

            const patient: Patient = row as Patient;
            return res.status(200).json({ message: "Patient retrieved successfully", patient });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error });
    }
}