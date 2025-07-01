export function slugify(text){
  return text
  .toString()
  .normalize("NFD")                 //decompose accented characters
  .replace(/\p{Diacritic}/gu, '')  // remove diacritical marks
  .toLowerCase()
  .trim()                        // remove leading or trailing whitespace 
  .replace(/[^a-z0-9]+/g, '-')  // replace non-alphanumeric with hyphen
  .replace(/--+/g, '-')         //collapse multiple hyphen
  .replace(/^-+|-+$/g, '')      //trim hyphens from ends 

}