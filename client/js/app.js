import { api } from './api.js';

// DOM Elements
const sections = {
    dashboard: document.getElementById('dashboard-section'),
    residents: document.getElementById('residents-section'),
    households: document.getElementById('households-section'),
    benefits: document.getElementById('benefits-section'),
    health: document.getElementById('health-section')
};

const navLinks = {
    dashboard: document.getElementById('nav-dashboard'),
    residents: document.getElementById('nav-residents'),
    households: document.getElementById('nav-households'),
    benefits: document.getElementById('nav-benefits'),
    health: document.getElementById('nav-health')
};

const tables = {
    residents: document.querySelector('#residents-table tbody'),
    households: document.querySelector('#households-table tbody'),
    benefits: document.querySelector('#benefits-table tbody'),
    health: document.querySelector('#health-table tbody')
};

const modals = {
    resident: document.getElementById('resident-modal'),
    household: document.getElementById('household-modal'),
    benefit: document.getElementById('benefit-modal'),
    health: document.getElementById('health-modal')
};

const forms = {
    resident: document.getElementById('resident-form'),
    household: document.getElementById('household-form'),
    benefit: document.getElementById('benefit-form'),
    health: document.getElementById('health-form')
};

// State
let currentSection = 'dashboard';
let allResidents = [];
let allHouseholds = [];
let allBenefits = [];
let allHealthRecords = [];

// Navigation Logic
function showSection(sectionName) {
    Object.values(sections).forEach(s => { if(s) s.style.display = 'none' });
    Object.values(navLinks).forEach(l => { if(l) l.classList.remove('active') });

    if(sections[sectionName]) sections[sectionName].style.display = 'block';
    if(navLinks[sectionName]) navLinks[sectionName].classList.add('active');
    currentSection = sectionName;

    if (sectionName === 'dashboard') loadDashboardStats();
    if (sectionName === 'residents') loadResidents();
    if (sectionName === 'households') loadHouseholds();
    if (sectionName === 'benefits') loadBenefits();
    if (sectionName === 'health') loadHealthRecords();
}

// Data Loading & Rendering
async function loadDashboardStats() {
    try {
        const stats = await api.getDashboardStats();
        document.getElementById('total-residents').innerText = stats.residents;
        document.getElementById('total-households').innerText = stats.households;
        document.getElementById('total-benefits').innerText = stats.benefits;
        document.getElementById('total-health').innerText = stats.health;
    } catch (error) {
        console.error('Error loading dashboard stats:', error);
    }
}
async function loadResidents() {
    try {
        allResidents = await api.getResidents();
        renderResidents(allResidents);
    } catch (error) {
        console.error('Error loading residents:', error);
    }
}

function handleResidentSearch() {
    const searchTerm = document.getElementById('resident-search-input').value.toLowerCase();
    const filtered = allResidents.filter(r => 
        `${r.first_name} ${r.last_name}`.toLowerCase().includes(searchTerm) ||
        (r.osca_id && r.osca_id.toLowerCase().includes(searchTerm))
    );
    renderResidents(filtered);
}

function renderResidents(residents) {
    if(!tables.residents) return;
    tables.residents.innerHTML = '';
    residents.forEach(resident => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${resident.first_name} ${resident.last_name}</td>
            <td>${new Date(resident.birth_date).toLocaleDateString()}</td>
            <td>${resident.osca_id || 'N/A'}</td>
            <td>${resident.gender}</td>
            <td>${resident.is_indigent ? '<span class="success">Yes</span>' : 'No'}</td>
            <td class="actions">
                <i class="fas fa-edit edit-resident" data-id="${resident.resident_id}"></i>
                <i class="fas fa-trash delete-resident" data-id="${resident.resident_id}"></i>
            </td>
        `;
        tables.residents.appendChild(row);
    });
}

async function loadHouseholds() {
    try {
        allHouseholds = await api.getHouseholds();
        renderHouseholds(allHouseholds);
    } catch (error) {
        console.error('Error loading households:', error);
    }
}

function handleHouseholdSearch() {
    const searchTerm = document.getElementById('household-search-input').value.toLowerCase();
    const filtered = allHouseholds.filter(h => 
        h.street_address.toLowerCase().includes(searchTerm) ||
        `purok ${h.purok_number}`.toLowerCase().includes(searchTerm) ||
        (h.emergency_contact_name && h.emergency_contact_name.toLowerCase().includes(searchTerm))
    );
    renderHouseholds(filtered);
}

function renderHouseholds(households) {
    if(!tables.households) return;
    tables.households.innerHTML = '';
    households.forEach(household => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>Purok ${household.purok_number}</td>
            <td>${household.street_address}</td>
            <td>${household.emergency_contact_name || 'N/A'}</td>
            <td>${household.emergency_contact_num || 'N/A'}</td>
            <td class="actions">
                <i class="fas fa-edit edit-household" data-id="${household.household_id}"></i>
                <i class="fas fa-trash delete-household" data-id="${household.household_id}"></i>
            </td>
        `;
        tables.households.appendChild(row);
    });
}

async function loadBenefits() {
    try {
        allBenefits = await api.getBenefits();
        renderBenefits(allBenefits);
    } catch (error) {
        console.error('Error loading benefits:', error);
    }
}

function handleBenefitSearch() {
    const searchTerm = document.getElementById('benefit-search-input').value.toLowerCase();
    const filtered = allBenefits.filter(b => 
        b.resident_name.toLowerCase().includes(searchTerm) ||
        b.benefit_type.toLowerCase().includes(searchTerm) ||
        b.distributed_by.toLowerCase().includes(searchTerm)
    );
    renderBenefits(filtered);
}

function renderBenefits(benefits) {
    if(!tables.benefits) return;
    tables.benefits.innerHTML = '';
    benefits.forEach(benefit => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${benefit.resident_name}</td>
            <td>${benefit.benefit_type}</td>
            <td>${new Date(benefit.date_received).toLocaleDateString()}</td>
            <td>${benefit.distributed_by}</td>
            <td class="actions">
                <i class="fas fa-edit edit-benefit" data-id="${benefit.benefit_id}"></i>
                <i class="fas fa-trash delete-benefit" data-id="${benefit.benefit_id}"></i>
            </td>
        `;
        tables.benefits.appendChild(row);
    });
}

async function loadHealthRecords() {
    try {
        allHealthRecords = await api.getHealthRecords();
        renderHealthRecords(allHealthRecords);
    } catch (error) {
        console.error('Error loading health records:', error);
    }
}

function handleHealthSearch() {
    const searchTerm = document.getElementById('health-search-input').value.toLowerCase();
    const filtered = allHealthRecords.filter(h => 
        h.resident_name.toLowerCase().includes(searchTerm) ||
        h.physical_status.toLowerCase().includes(searchTerm) ||
        (h.medical_conditions && h.medical_conditions.toLowerCase().includes(searchTerm))
    );
    renderHealthRecords(filtered);
}

function renderHealthRecords(records) {
    if(!tables.health) return;
    tables.health.innerHTML = '';
    records.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.resident_name}</td>
            <td>${record.physical_status}</td>
            <td>${record.medical_conditions || 'None'}</td>
            <td>${new Date(record.last_checkup).toLocaleDateString()}</td>
            <td class="actions">
                <i class="fas fa-edit edit-health" data-id="${record.health_id}"></i>
                <i class="fas fa-trash delete-health" data-id="${record.health_id}"></i>
            </td>
        `;
        tables.health.appendChild(row);
    });
}

// Modal Logic
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) modal.style.display = 'block';
    if (modalId === 'benefit-modal') populateResidentDropdown('benefit_resident_id');
    if (modalId === 'health-modal') populateResidentDropdown('health_resident_id');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) modal.style.display = 'none';
    const form = forms[modalId.replace('-modal', '')];
    if (form) form.reset();
    
    // Clear hidden IDs
    ['resident-id', 'household-id', 'benefit-id', 'health-id'].forEach(id => {
        const el = document.getElementById(id);
        if(el) el.value = '';
    });
}

async function populateResidentDropdown(dropdownId) {
    const residents = await api.getResidents();
    const dropdown = document.getElementById(dropdownId);
    if(!dropdown) return;
    dropdown.innerHTML = '<option value="">Select Resident</option>';
    residents.forEach(r => {
        dropdown.innerHTML += `<option value="${r.resident_id}">${r.first_name} ${r.last_name}</option>`;
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    showSection('dashboard');

    // Dashboard Nav
    if(navLinks.dashboard) navLinks.dashboard.addEventListener('click', (e) => { e.preventDefault(); showSection('dashboard'); });

    // Resident Search
    const searchBtn = document.getElementById('resident-search-btn');
    const searchInput = document.getElementById('resident-search-input');
    if(searchBtn) searchBtn.addEventListener('click', handleResidentSearch);
    if(searchInput) searchInput.addEventListener('keyup', (e) => {
        if(e.key === 'Enter') handleResidentSearch();
    });

    // Household Search
    const householdSearchBtn = document.getElementById('household-search-btn');
    const householdSearchInput = document.getElementById('household-search-input');
    if(householdSearchBtn) householdSearchBtn.addEventListener('click', handleHouseholdSearch);
    if(householdSearchInput) householdSearchInput.addEventListener('keyup', (e) => {
        if(e.key === 'Enter') handleHouseholdSearch();
    });

    // Benefit Search
    const benefitSearchBtn = document.getElementById('benefit-search-btn');
    const benefitSearchInput = document.getElementById('benefit-search-input');
    if(benefitSearchBtn) benefitSearchBtn.addEventListener('click', handleBenefitSearch);
    if(benefitSearchInput) benefitSearchInput.addEventListener('keyup', (e) => {
        if(e.key === 'Enter') handleBenefitSearch();
    });

    // Health Search
    const healthSearchBtn = document.getElementById('health-search-btn');
    const healthSearchInput = document.getElementById('health-search-input');
    if(healthSearchBtn) healthSearchBtn.addEventListener('click', handleHealthSearch);
    if(healthSearchInput) healthSearchInput.addEventListener('keyup', (e) => {
        if(e.key === 'Enter') handleHealthSearch();
    });

    // Nav
    if(navLinks.residents) navLinks.residents.addEventListener('click', (e) => { e.preventDefault(); showSection('residents'); });
    if(navLinks.households) navLinks.households.addEventListener('click', (e) => { e.preventDefault(); showSection('households'); });
    if(navLinks.benefits) navLinks.benefits.addEventListener('click', (e) => { e.preventDefault(); showSection('benefits'); });
    if(navLinks.health) navLinks.health.addEventListener('click', (e) => { e.preventDefault(); showSection('health'); });

    // Buttons
    const btnMap = {
        'add-resident-btn': 'resident-modal',
        'add-household-btn': 'household-modal',
        'add-benefit-btn': 'benefit-modal',
        'add-health-btn': 'health-modal'
    };

    Object.entries(btnMap).forEach(([btnId, modalId]) => {
        const btn = document.getElementById(btnId);
        if(btn) btn.addEventListener('click', () => {
            const title = document.getElementById(`${modalId}-title`);
            if(title) {
                if(modalId === 'resident-modal') title.innerText = 'Add Resident';
                if(modalId === 'household-modal') title.innerText = 'Add Household';
                if(modalId === 'benefit-modal') title.innerText = 'Record Benefit';
                if(modalId === 'health-modal') title.innerText = 'Update Health Record';
            }
            openModal(modalId);
        });
    });

    // Close Modals
    ['resident', 'household', 'benefit', 'health'].forEach(type => {
        const closeBtn = document.getElementById(`close-${type}-modal`);
        if(closeBtn) closeBtn.addEventListener('click', () => closeModal(`${type}-modal`));
    });

    // Forms
    if(forms.resident) forms.resident.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('resident-id').value;
        
        // Handle Household Creation/Linking
        let household_id = null;
        const purok = document.getElementById('res_purok_number').value;
        const street = document.getElementById('res_street_address').value;
        
        if (purok && street) {
            // Check if household exists
            const households = await api.getHouseholds();
            const existing = households.find(h => h.purok_number == purok && h.street_address.toLowerCase() === street.toLowerCase());
            
            if (existing) {
                household_id = existing.household_id;
                // Update emergency contact info
                await api.updateHousehold(household_id, {
                    purok_number: purok,
                    street_address: street,
                    emergency_contact_name: document.getElementById('res_emergency_contact_name').value,
                    emergency_contact_num: document.getElementById('res_emergency_contact_num').value
                });
            } else {
                const newH = await api.createHousehold({
                    purok_number: purok,
                    street_address: street,
                    emergency_contact_name: document.getElementById('res_emergency_contact_name').value,
                    emergency_contact_num: document.getElementById('res_emergency_contact_num').value
                });
                household_id = newH.household_id;
            }
        }

        const data = {
            first_name: document.getElementById('first_name').value,
            last_name: document.getElementById('last_name').value,
            birth_date: document.getElementById('birth_date').value,
            gender: document.getElementById('gender').value,
            civil_status: document.getElementById('civil_status').value,
            osca_id: document.getElementById('osca_id').value,
            household_id: household_id,
            is_indigent: document.getElementById('is_indigent').checked
        };
        if (id) await api.updateResident(id, data); else await api.createResident(data);
        closeModal('resident-modal');
        loadResidents();
    });

    if(forms.household) forms.household.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('household-id').value;
        const data = {
            purok_number: document.getElementById('purok_number').value,
            street_address: document.getElementById('street_address').value,
            emergency_contact_name: document.getElementById('emergency_contact_name').value,
            emergency_contact_num: document.getElementById('emergency_contact_num').value
        };
        if (id) await api.updateHousehold(id, data); else await api.createHousehold(data);
        closeModal('household-modal');
        loadHouseholds();
    });

    if(forms.benefit) forms.benefit.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('benefit-id').value;
        const data = {
            resident_id: document.getElementById('benefit_resident_id').value,
            benefit_type: document.getElementById('benefit_type').value,
            distributed_by: document.getElementById('distributed_by').value
        };
        if (id) await api.updateBenefit(id, data); else await api.createBenefit(data);
        closeModal('benefit-modal');
        loadBenefits();
    });

    if(forms.health) forms.health.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            resident_id: document.getElementById('health_resident_id').value,
            physical_status: document.getElementById('physical_status').value,
            medical_conditions: document.getElementById('medical_conditions').value,
            last_checkup: document.getElementById('last_checkup').value
        };
        await api.createHealthRecord(data);
        closeModal('health-modal');
        loadHealthRecords();
    });

    // Table Actions (Event Delegation)
    document.addEventListener('click', async (e) => {
        const target = e.target;
        const id = target.getAttribute('data-id');

        // Delete actions
        if (target.classList.contains('delete-resident')) {
            if (confirm('Delete this resident?')) { await api.deleteResident(id); loadResidents(); }
        }
        if (target.classList.contains('delete-household')) {
            if (confirm('Delete household? Residents will be unlinked.')) { await api.deleteHousehold(id); loadHouseholds(); }
        }
        if (target.classList.contains('delete-benefit')) {
            if (confirm('Delete benefit record?')) { await api.deleteBenefit(id); loadBenefits(); }
        }
        if (target.classList.contains('delete-health')) {
            if (confirm('Delete health record?')) { await api.deleteHealthRecord(id); loadHealthRecords(); }
        }

        // Edit actions
        if (target.classList.contains('edit-resident')) {
            const res = await api.getResident(id);
            document.getElementById('resident-id').value = res.resident_id;
            document.getElementById('first_name').value = res.first_name;
            document.getElementById('last_name').value = res.last_name;
            document.getElementById('birth_date').value = res.birth_date.split('T')[0];
            document.getElementById('gender').value = res.gender;
            document.getElementById('civil_status').value = res.civil_status;
            document.getElementById('osca_id').value = res.osca_id || '';
            
            // Populate household fields
            if (res.household_id) {
                const h = await api.getHousehold(res.household_id);
                document.getElementById('res_purok_number').value = h.purok_number;
                document.getElementById('res_street_address').value = h.street_address;
                document.getElementById('res_emergency_contact_name').value = h.emergency_contact_name || '';
                document.getElementById('res_emergency_contact_num').value = h.emergency_contact_num || '';
            }

            document.getElementById('is_indigent').checked = !!res.is_indigent;
            document.getElementById('resident-modal-title').innerText = 'Edit Resident';
            openModal('resident-modal');
        }
        if (target.classList.contains('edit-household')) {
            const h = await api.getHousehold(id);
            document.getElementById('household-id').value = h.household_id;
            document.getElementById('purok_number').value = h.purok_number;
            document.getElementById('street_address').value = h.street_address;
            document.getElementById('emergency_contact_name').value = h.emergency_contact_name || '';
            document.getElementById('emergency_contact_num').value = h.emergency_contact_num || '';
            document.getElementById('household-modal-title').innerText = 'Edit Household';
            openModal('household-modal');
        }
        if (target.classList.contains('edit-benefit')) {
            const b = await api.getBenefit(id);
            document.getElementById('benefit-id').value = b.benefit_id;
            document.getElementById('benefit_resident_id').value = b.resident_id;
            document.getElementById('benefit_type').value = b.benefit_type;
            document.getElementById('distributed_by').value = b.distributed_by;
            document.getElementById('benefit-modal-title').innerText = 'Edit Benefit Record';
            openModal('benefit-modal');
        }
        if (target.classList.contains('edit-health')) {
            const h = await api.getHealthRecord(id);
            document.getElementById('health_resident_id').value = h.resident_id;
            document.getElementById('physical_status').value = h.physical_status;
            document.getElementById('medical_conditions').value = h.medical_conditions || '';
            document.getElementById('last_checkup').value = h.last_checkup.split('T')[0];
            document.getElementById('health-modal-title').innerText = 'Update Health Record';
            openModal('health-modal');
        }
    });
});
