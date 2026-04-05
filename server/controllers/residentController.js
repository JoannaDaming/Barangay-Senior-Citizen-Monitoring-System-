const pool = require('../config/db');

exports.getAllResidents = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM residents');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching residents:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.getResidentById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM residents WHERE resident_id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Resident not found' });
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching resident:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.createResident = async (req, res) => {
    const { household_id, first_name, last_name, birth_date, gender, civil_status, osca_id, is_indigent } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO residents (household_id, first_name, last_name, birth_date, gender, civil_status, osca_id, is_indigent) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [household_id || null, first_name, last_name, birth_date, gender, civil_status, osca_id, is_indigent]
        );
        res.status(201).json({ resident_id: result.insertId, ...req.body });
    } catch (error) {
        console.error('Error creating resident:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.updateResident = async (req, res) => {
    const { household_id, first_name, last_name, birth_date, gender, civil_status, osca_id, is_indigent } = req.body;
    try {
        await pool.query(
            'UPDATE residents SET household_id=?, first_name=?, last_name=?, birth_date=?, gender=?, civil_status=?, osca_id=?, is_indigent=? WHERE resident_id=?',
            [household_id || null, first_name, last_name, birth_date, gender, civil_status, osca_id, is_indigent, req.params.id]
        );
        res.json({ message: 'Resident updated successfully' });
    } catch (error) {
        console.error('Error updating resident:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.deleteResident = async (req, res) => {
    try {
        await pool.query('DELETE FROM residents WHERE resident_id = ?', [req.params.id]);
        res.json({ message: 'Resident deleted successfully' });
    } catch (error) {
        console.error('Error deleting resident:', error);
        res.status(500).json({ message: error.message });
    }
};
