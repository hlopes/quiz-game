/**
 * There are two type of constants exported here:
 * - simple media query strings (to use, for example, with window.matchMedia())
 * - media query strings prefixed with @media (for easier use on template literals)
 */

/* Simple */
export const extraSmall = '(max-width: 47.94em)'; // <= 767px
export const small = '(min-width: 48em) and (max-width: 63.94em)'; // >= 768px && <= 1023
export const medium = '(min-width: 64em) and (max-width: 74.94em)'; // >= 1024 && <= 1199
export const large = '(min-width: 75em) and (max-width: 89.94em)'; // >= 1200 && <= 1439
export const extraLarge = '(min-width: 90em)'; // >= 1440px

export const gteSmall = '(min-width: 48em)'; // >= 768px
export const gteMedium = '(min-width: 75em)'; // >= 1200px

export const lteSmall = '(max-width: 63.94em)'; // <= 1023px
export const lteMedium = '(max-width: 74.94em)'; // <= 1199px

/* Prefixed with @media */
export const extraSmallMedia = `@media ${extraSmall}`; // <= 767px
export const smallMedia = `@media ${small}`; // >= 768px && <= 1023
export const mediumMedia = `@media ${medium}`; // >= 1024 && <= 1199
export const largeMedia = `@media ${large}`; // >= 1200 && <= 1439
export const extraLargeMedia = `@media ${extraLarge}`; // >= 1440px

export const gteSmallMedia = `@media ${gteSmall}`; // >= 768px
export const gteMediumMedia = `@media ${gteMedium}`; // >= 1200px

export const lteSmallMedia = `@media ${lteSmall}`; // <= 1023px
export const lteMediumMedia = `@media ${lteMedium}`; // <= 1199px
