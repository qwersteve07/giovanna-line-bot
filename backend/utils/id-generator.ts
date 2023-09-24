const { v4: uuidv4 } = require('uuid');

export const generateUUID = () => {
    return uuidv4()
}