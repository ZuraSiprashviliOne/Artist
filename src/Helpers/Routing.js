
export function getPageSlag(path){
    let parts = path.split('/');
    let page = parts.indexOf('pages') + 1;
    
    return parts[page];
}