import { createMedia } from '@artsy/fresnel';

const AppMedia = createMedia({
    breakpoints: {
        xs: 0,
        sm: 768,
        md: 1024,
        lg: 1200,
        xl: 1440,
    },
});

// Generate CSS to be injected into the head
export const mediaStyle = AppMedia.createMediaStyle();

export const { Media, MediaContextProvider } = AppMedia;
