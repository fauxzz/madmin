export const addToArray = (data, array) => [data].concat(array);
export const updateArray = (data, array) => array.map(item => data.id === item.id ? data : item); 
export const deleteFromArray = (data, array) => array.filter(item => data.id !== item.id);