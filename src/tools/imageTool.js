export const checkImage = (file) => {
    if(!(/\.(jpg|png)$/i).test(file.name)) {
        return {success: false, error: "Formato de la imagen no es compatible"};
    } else if(file.size > 1000000) {
        return {success: false, error: "Imagen es muy pesada para subir"};
    } else {
        return {success: true};
    }
}