import express from 'express';

const PORT = Number.parseInt(process.env.PORT || '3000', 10);

const app = express();
app.disable('x-powered-by');

console.log('Starting development server');
const viteDevelopmentServer = await import('vite').then((vite) =>
  vite.createServer({
    server: {middlewareMode: true},
  }),
);
app.use(viteDevelopmentServer.middlewares);
// eslint-disable-next-line unicorn/prevent-abbreviations
app.use(async (request, res, next) => {
  try {
    const source = await viteDevelopmentServer.ssrLoadModule('./server/app.ts');
    return await source.default(request, res, next);
  } catch (error) {
    if (typeof error === 'object' && error instanceof Error) {
      viteDevelopmentServer.ssrFixStacktrace(error);
    }

    next(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
