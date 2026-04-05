const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
    // Residents
    async getResidents() {
        const response = await fetch(`${API_BASE_URL}/residents`);
        return response.json();
    },
    async getResident(id) {
        const response = await fetch(`${API_BASE_URL}/residents/${id}`);
        return response.json();
    },
    async createResident(residentData) {
        const response = await fetch(`${API_BASE_URL}/residents`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(residentData)
        });
        return response.json();
    },
    async updateResident(id, residentData) {
        const response = await fetch(`${API_BASE_URL}/residents/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(residentData)
        });
        return response.json();
    },
    async deleteResident(id) {
        const response = await fetch(`${API_BASE_URL}/residents/${id}`, {
            method: 'DELETE'
        });
        return response.json();
    },

    // Households
    async getHouseholds() {
        const response = await fetch(`${API_BASE_URL}/households`);
        return response.json();
    },
    async getHousehold(id) {
        const response = await fetch(`${API_BASE_URL}/households/${id}`);
        return response.json();
    },
    async createHousehold(householdData) {
        const response = await fetch(`${API_BASE_URL}/households`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(householdData)
        });
        return response.json();
    },
    async updateHousehold(id, householdData) {
        const response = await fetch(`${API_BASE_URL}/households/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(householdData)
        });
        return response.json();
    },
    async deleteHousehold(id) {
        const response = await fetch(`${API_BASE_URL}/households/${id}`, {
            method: 'DELETE'
        });
        return response.json();
    },

    // Benefits
    async getBenefits() {
        const response = await fetch(`${API_BASE_URL}/benefits`);
        return response.json();
    },
    async getBenefit(id) {
        const response = await fetch(`${API_BASE_URL}/benefits/${id}`);
        return response.json();
    },
    async createBenefit(benefitData) {
        const response = await fetch(`${API_BASE_URL}/benefits`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(benefitData)
        });
        return response.json();
    },
    async updateBenefit(id, benefitData) {
        const response = await fetch(`${API_BASE_URL}/benefits/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(benefitData)
        });
        return response.json();
    },
    async deleteBenefit(id) {
        const response = await fetch(`${API_BASE_URL}/benefits/${id}`, {
            method: 'DELETE'
        });
        return response.json();
    },

    // Health Records
    async getHealthRecords() {
        const response = await fetch(`${API_BASE_URL}/health`);
        return response.json();
    },
    async getHealthRecord(id) {
        const response = await fetch(`${API_BASE_URL}/health/${id}`);
        return response.json();
    },
    async createHealthRecord(healthData) {
        const response = await fetch(`${API_BASE_URL}/health`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(healthData)
        });
        return response.json();
    },
    async deleteHealthRecord(id) {
        const response = await fetch(`${API_BASE_URL}/health/${id}`, {
            method: 'DELETE'
        });
        return response.json();
    },

    // Dashboard
    async getDashboardStats() {
        const response = await fetch(`${API_BASE_URL}/dashboard/stats`);
        return response.json();
    }
};
