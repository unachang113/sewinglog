import {type LinksFunction} from '@remix-run/node';
import {Links, Meta, Outlet, Scripts, ScrollRestoration} from '@remix-run/react';
import {Analytics} from '@vercel/analytics/react';
import {Header} from './routes/components/header';
import stylesheet from '~/tailwind.css?url';

export const links: LinksFunction = () => [{rel: 'stylesheet', href: stylesheet}];

export function Layout({children}: {readonly children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="bg-main-pattern bg-repeat w-full min-h-screen bg-contain flex flex-col gap-10">
          <Header />
          <main className="w-10/12 mx-auto">{children}</main>
          <ScrollRestoration />
          <Scripts />
          <Analytics />
        </div>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
