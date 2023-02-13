
export const connection = async(type) => {
    try {
      const response = await fetch(`http://192.168.0.158:3001/${type}`);
      const json = await response.json();
      return(type === 'doctors' ? json.doctors : json.patients);
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }

};

export const postData = async (name, age, type) => {
  try {
    const response = await fetch(`http://192.168.0.158:3001/${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name, age: age  }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};


export const putData = async (name, age, type ) => {
  try {
    const response = await fetch(`http://192.168.0.158:3001/${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name, age: age  }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};



