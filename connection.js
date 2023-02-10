
export const connection = async(type) => {
    try {
      const response = await fetch(`http://192.168.0.158:3001/${type}`);
      const json = await response.json();
      return(json.doctors);
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }

};
