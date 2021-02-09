import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

import { mediaStyle } from '@components/media/Media';

class AppDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta name="description" content="Quiz Game" />
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

export default AppDocument;
