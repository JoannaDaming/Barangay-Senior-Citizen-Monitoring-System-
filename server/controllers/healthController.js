const pool = require('../config/db');

exports.getAllHealthRecords = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT h.*, CONCAT(r.first_name, ' ', r.last_name) as resident_name 
            FROM health_records h
            JOIN residents r ON h.resident_id = r.resident_id
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching health records:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.getHealthRecordById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM health_records WHERE health_id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Health record not found' });
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching health record:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.createHealthRecord = async (req, res) => {
    const { resident_id, physical_status, medical_conditions, last_checkup } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO health_records (resident_id, physical_status, medical_conditions, last_checkup) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE physical_status=?, medical_conditions=?, last_checkup=?',
            [resident_id, physical_status, medical_conditions, last_checkup, physical_status, medical_conditions, last_checkup]
        );
        res.status(201).json({ health_id: result.insertId, ...req.body });
    } catch (error) {
        console.error('Error saving health record:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.deleteHealthRecord = async (req, res) => {
    try {
        await pool.query('DELETE FROM health_records WHERE health_id = ?', [req.params.id]);
        res.json({ message: 'Health record deleted successfully' });
    } catch (error) {
        console.error('Error deleting health record:', error);
        res.status(500).json({ message: error.message });
    }
};
