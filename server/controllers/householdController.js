const pool = require('../config/db');

exports.getAllHouseholds = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM households');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching households:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.getHouseholdById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM households WHERE household_id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Household not found' });
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching household:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.createHousehold = async (req, res) => {
    const { purok_number, street_address, emergency_contact_name, emergency_contact_num } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO households (purok_number, street_address, emergency_contact_name, emergency_contact_num) VALUES (?, ?, ?, ?)',
            [purok_number, street_address, emergency_contact_name, emergency_contact_num]
        );
        res.status(201).json({ household_id: result.insertId, ...req.body });
    } catch (error) {
        console.error('Error creating household:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.updateHousehold = async (req, res) => {
    const { purok_number, street_address, emergency_contact_name, emergency_contact_num } = req.body;
    try {
        await pool.query(
            'UPDATE households SET purok_number=?, street_address=?, emergency_contact_name=?, emergency_contact_num=? WHERE household_id=?',
            [purok_number, street_address, emergency_contact_name, emergency_contact_num, req.params.id]
        );
        res.json({ message: 'Household updated successfully' });
    } catch (error) {
        console.error('Error updating household:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.deleteHousehold = async (req, res) => {
    try {
        await pool.query('DELETE FROM households WHERE household_id = ?', [req.params.id]);
        res.json({ message: 'Household deleted successfully' });
    } catch (error) {
        console.error('Error deleting household:', error);
        res.status(500).json({ message: error.message });
    }
};
