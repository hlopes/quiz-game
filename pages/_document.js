import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

import { mediaStyle } from '../components/media/Media';

export default class AppDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <style
                        type="text/css"
                        dangerouslySetInnerHTML={{ __html: mediaStyle }}
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
