const URL = 'http://localhost:3000';

//GET
async function fetchGet(section) {
  try {
    const res = await fetch(`${URL}/${section}`);
    // console.log('GET:', res.json());
    return await res.json();
  } catch (error) {
    console.error('Error en GET:', error);
  }
}

//GET BY ID
async function fetchGetById(id,section) {
  try {
    const res = await fetch(`${URL}/${section}/${id}`);
    // console.log('GET:', res.json());
    return await res.json();
  } catch (error) {
    console.error('Error en GET:', error);
  }
}

//POST
async function fetchPost(section,data) {
  try {
    const res = await fetch(`${URL}/${section}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (error) {
    console.error('Error en POST:', error);
  }
}

//PUT
async function fetchPut(id,section,data) {
  try {
    const res = await fetch(`${URL}/${section}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    return await res.json();
  } catch (error) {
    console.error('Error en PUT:', error);
  }
}

// DELETE
async function fetchDelete(id,section) {
  try {
    const res = await fetch(`${URL}/${section}/${id}`, {
      method: 'DELETE'
    });

    return true;
  } catch (error) {
    console.error('Error en DELETE:', error);
  }
}