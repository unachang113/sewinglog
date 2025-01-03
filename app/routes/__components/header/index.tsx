import {Link} from 'react-router';

export function Header() {
  return (
    <header className="px-4 py-4 w-full border-b-2 border-primary bg-white">
      <h1 className="font-bold text-2xl text-center font-logo text-primary">
        <Link to="/">Sewing log</Link>
      </h1>
    </header>
  );
}
