import { strings } from "./strings";

function id() {
    return Math.random().toString(36).substr(2, 9);
}

export function loadColors() {
    const savedContent = window.location.hash.substr(1);
    let colors = [];
    if (savedContent.length > 0) {
        colors = savedContent.split('/').map(pack => {
            let [name, color] = pack.split(':');
            return {
                id: id(),
                name: decodeURI(name),
                color: decodeURI(color),
            };
        });
    }
    return colors;
}

export function addNewColor(colors) {
    colors.push({
        id: id(),
        name: strings.newColorName,
        color: '0091de',
    });
    return colors;
}

export function removeColor(colors, color) {
    const colIndex = colors.findIndex(col => col.id === color.id);
    if (colIndex >= 0) {
        colors.splice(colIndex, 1);
    }
    return colors;
}

export function duplicateColor(colors, color) {
    colors.push({
        id: id(),
        color: color.color,
        name: color.name,
    });
    return colors;
}

export function updateHash(colors) {
    window.location.hash = '#' + colors.map((col) => {
        return [encodeURI(col.name), encodeURI(col.color)].join(':');
    }).join('/');
}