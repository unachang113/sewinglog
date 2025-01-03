import {createRequestHandler} from '@react-router/express';
import express from 'express';
// eslint-disable-next-line import/no-unassigned-import
import 'react-router';

const app = express();

app.use(
  createRequestHandler({
    // @ts-expect-error - virtual module provided by React Router at build time
    build: async () => import('virtual:react-router/server-build'),
    getLoadContext() {
      return {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        VALUE_FROM_VERCEL: 'Hello from Vercel',
      };
    },
  }),
);

export default app;
