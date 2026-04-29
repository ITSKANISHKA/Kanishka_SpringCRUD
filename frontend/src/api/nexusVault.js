const VAULT_ENDPOINT = 'http://localhost:8080/nexus/scholars';

/**
 * Interface layer for the Academic Nexus vault.
 */
export const nexusVault = {
  // Retrieve all records
  fetchAllScholars: async () => {
    const response = await fetch(VAULT_ENDPOINT);
    if (!response.ok) throw new Error('Vault access failure');
    return response.json();
  },

  // Enroll a new participant
  registerScholar: async (data) => {
    const response = await fetch(VAULT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.detail || 'Registration failed');
    }
    return response.json();
  },

  // Modify existing record
  updateScholarInfo: async (sid, data) => {
    const response = await fetch(`${VAULT_ENDPOINT}/${sid}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.detail || 'Update failure');
    }
    return response.json();
  },

  // Purge record from vault
  removeScholar: async (sid) => {
    const response = await fetch(`${VAULT_ENDPOINT}/${sid}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) throw new Error('De-registration failure');
    return true;
  }
};
