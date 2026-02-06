const URL = 'http://localhost:3000';

//GET
export async function fetchGet(section) {
  try {
    const res = await fetch(`${URL}/${section}`);
    if (!res.ok) {
      throw new Error(`GET ${section}: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error en GET:', error.message || error);
    throw error;
  }
}

//GET BY ID
export async function fetchGetById(id, section) {
  try {
    const res = await fetch(`${URL}/${section}/${id}`);
    if (!res.ok) {
      throw new Error(`GET ${section}/${id}: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error en GET by ID:', error.message || error);
    throw error;
  }
}

//POST
export async function fetchPost(section, data) {
  try {
    const res = await fetch(`${URL}/${section}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      throw new Error(`POST ${section}: ${res.status} ${res.statusText}`);
    }
    return [await res.json(), true];
  } catch (error) {
    console.error('Error en POST:', error.message || error);
    throw error;
  }
}

//PUT
export async function fetchPut(id, section, data) {
  try {
    const res = await fetch(`${URL}/${section}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      throw new Error(`PUT ${section}/${id}: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error en PUT:', error.message || error);
    throw error;
  }
}

// DELETE
export async function fetchDelete(id, section) {
  try {
    const res = await fetch(`${URL}/${section}/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) {
      throw new Error(`DELETE ${section}/${id}: ${res.status} ${res.statusText}`);
    }
    return true;
  } catch (error) {
    console.error('Error en DELETE:', error.message || error);
    throw error;
  }
}