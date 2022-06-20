
function updateArray(array, data) {
    return array.map(item => item.id === data.id ? data : item);
}

Array.update(updateArray);