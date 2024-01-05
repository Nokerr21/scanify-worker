export function generateNewIndex () {
    var index = "";
    const signs = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const indexLength = 10;

    for (let i = 0; i < indexLength; i++) {
        let randNum = Math.floor(Math.random() * signs.length);
        index += signs.charAt(randNum);
    }

    return index;
}