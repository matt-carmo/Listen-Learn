
export function parseSlug(slug: string) {
    return slug
    .normalize('NFD') 
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/gi, '') 
    .trim() //
    .replace(/\s+/g, '-') 
    .toLowerCase(); 
}