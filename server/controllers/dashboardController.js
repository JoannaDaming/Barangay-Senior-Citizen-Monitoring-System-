const pool = require('../config/db');

exports.getStats = async (req, res) => {
    try {
        const [[residentsCount]] = await pool.query('SELECT COUNT(*) as total FROM residents');
        const [[householdsCount]] = await pool.query('SELECT COUNT(*) as total FROM households');
        const [[benefitsCount]] = await pool.query('SELECT COUNT(*) as total FROM benefit_logs');
        const [[healthCount]] = await pool.query('SELECT COUNT(*) as total FROM health_records');

        res.json({
            residents: residentsCount.total,
            households: householdsCount.total,
            benefits: benefitsCount.total,
            health: healthCount.total
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ message: error.message });
    }
};
