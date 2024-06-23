import {json, type LinksFunction} from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from '@remix-run/react';
import {Analytics} from '@vercel/analytics/react';
import {useEffect} from 'react';
import {Header} from './routes/__components/header';
import stylesheet from '~/tailwind.css?url';
import * as gtag from '~/utils/gtags.client';

export const links: LinksFunction = () => [{rel: 'stylesheet', href: stylesheet}];

// Load the GA tracking id from the .env
export const loader = async () => {
  return json({gaTrackingId: process.env.GA_TRACKING_ID});
};

export function Layout({children}: {readonly children: React.ReactNode}) {
  const {gaTrackingId} = useLoaderData<typeof loader>();
  const location = useLocation();

  useEffect(() => {
    if (gaTrackingId?.length) {
      gtag.pageview(location.pathname, gaTrackingId);
    }
  }, [gaTrackingId, location]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {gaTrackingId ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`} />
            <script
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${gaTrackingId}', {
                  page_path: window.location.pathname,
                });
              `,
              }}
              async
              id="gtag-init"
            />
          </>
        ) : null}
        <div className="bg-main-pattern bg-repeat w-full min-h-screen bg-contain flex flex-col gap-10">
          <Header />
          <main className="w-10/12 mx-auto pb-10">{children}</main>
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
