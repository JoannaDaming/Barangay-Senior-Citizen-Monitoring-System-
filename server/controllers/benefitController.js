const pool = require('../config/db');

exports.getAllBenefits = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT b.*, CONCAT(r.first_name, ' ', r.last_name) as resident_name 
            FROM benefit_logs b
            JOIN residents r ON b.resident_id = r.resident_id
            ORDER BY b.date_received DESC
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching benefits:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.getBenefitById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM benefit_logs WHERE benefit_id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Benefit record not found' });
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching benefit:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.createBenefit = async (req, res) => {
    const { resident_id, benefit_type, distributed_by } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO benefit_logs (resident_id, benefit_type, distributed_by) VALUES (?, ?, ?)',
            [resident_id, benefit_type, distributed_by]
        );
        res.status(201).json({ benefit_id: result.insertId, ...req.body });
    } catch (error) {
        console.error('Error creating benefit:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.updateBenefit = async (req, res) => {
    const { resident_id, benefit_type, distributed_by } = req.body;
    try {
        await pool.query(
            'UPDATE benefit_logs SET resident_id=?, benefit_type=?, distributed_by=? WHERE benefit_id=?',
            [resident_id, benefit_type, distributed_by, req.params.id]
        );
        res.json({ message: 'Benefit record updated successfully' });
    } catch (error) {
        console.error('Error updating benefit:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.deleteBenefit = async (req, res) => {
    try {
        await pool.query('DELETE FROM benefit_logs WHERE benefit_id = ?', [req.params.id]);
        res.json({ message: 'Benefit record deleted successfully' });
    } catch (error) {
        console.error('Error deleting benefit:', error);
        res.status(500).json({ message: error.message });
    }
};
