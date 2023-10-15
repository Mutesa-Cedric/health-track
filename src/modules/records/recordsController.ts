import db from "../../utils/db";
import Record from "./recordModel";
import { Request, Response } from "express";


export const createRecord = async (req: Request, res: Response) => {
    try {
        const { patient_id, body_temperature, heart_rate } = req.body;
        if (!patient_id || !body_temperature || !heart_rate) {
            return res.status(400).json({
                message: "Bad request", missingFields: {
                    patient_id: !patient_id,
                    body_temperature: !body_temperature,
                    heart_rate: !heart_rate
                }
            });
        }

        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        db.run(
            `INSERT INTO records (patient_id, body_temperature, heart_rate, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?)`,
            [patient_id, body_temperature, heart_rate, createdAt, updatedAt],
            function (err) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ message: "Internal server error", error: err });
                }

                const id = this.lastID;
                const record: Record = {
                    id,
                    patient_id,
                    body_temperature,
                    heart_rate,
                    createdAt,
                    updatedAt
                }
                return res.status(201).json({ message: "Record created successfully", record });
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}

export const getAllRecords = async (req: Request, res: Response) => {
    try {
        db.all("SELECT * FROM records", (err, rows) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Internal server error", error: err });
            }

            const records: Record[] = rows as Record[];
            return res.status(200).json({ message: "Records retrieved successfully", records });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}

export const getPatientRecords = async (req: Request, res: Response) => {
    try {
        const { patient_id } = req.params;
        if (!patient_id) {
            return res.status(400).json({
                message: "Bad request", missingFields: {
                    patient_id: !patient_id
                }
            });
        }

        db.all("SELECT * FROM records WHERE patient_id = ?", [patient_id], (err, rows) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Internal server error", error: err });
            }

            const records: Record[] = rows as Record[];
            return res.status(200).json({ message: "Records retrieved successfully", records });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}

export const updateRecord = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { patient_id, body_temperature, heart_rate } = req.body;
        if (!patient_id || !body_temperature || !heart_rate) {
            return res.status(400).json({
                message: "Bad request", missingFields: {
                    patient_id: !patient_id,
                    body_temperature: !body_temperature,
                    heart_rate: !heart_rate
                }
            });
        }

        const updatedAt = new Date().toISOString();
        db.run(
            `UPDATE records SET patient_id = ?, body_temperature = ?, heart_rate = ?, updatedAt = ? WHERE id = ?`,
            [patient_id, body_temperature, heart_rate, updatedAt, id],
            function (err) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ message: "Internal server error", error: err });
                }

                const record: Record = {
                    id: parseInt(id),
                    patient_id,
                    body_temperature,
                    heart_rate,
                    createdAt: "",
                    updatedAt
                }
                return res.status(200).json({ message: "Record updated successfully", record });
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}

export const getRecord = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: "Bad request", missingFields: {
                    id: !id
                }
            });
        }

        db.get("SELECT * FROM records WHERE id = ?", [id], (err, row) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Internal server error", error: err });
            }

            const record: Record = row as Record;
            return res.status(200).json({ message: "Record retrieved successfully", record });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}

export const deleteRecord = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: "Bad request", missingFields: {
                    id: !id
                }
            });
        }

        db.run(
            `DELETE FROM records WHERE id = ?`,
            [id],
            function (err) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ message: "Internal server error", error: err });
                }

                return res.status(200).json({ message: "Record deleted successfully" });
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}
