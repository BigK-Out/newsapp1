import Link from "next/link";
import NavLinks from "./NavLinks";
import ThemeToggle from "./ThemeToggle";
import Icon from "./Icon";
import UtilityBar from "./UtilityBar";

export default function Masthead() {
  return (
    <header className="masthead">
      <div className="wrap">
        <UtilityBar />
        <div className="masthead-brand">
          <Link href="/" className="wordmark" aria-label="ForPeople News, front page">
            For<span>People</span>
          </Link>
          <p className="tagline">News from the people who live it, read by the people it affects.</p>
        </div>
      </div>
      <div className="navbar">
        <div className="wrap navbar-inner">
          <NavLinks />
          <div className="navbar-tools">
            <form action="/search" role="search" className="search">
              <label htmlFor="q" className="sr-only">Search stories</label>
              <input id="q" name="q" type="search" placeholder="Search stories" autoComplete="off" />
              <button type="submit" aria-label="Search"><Icon name="search" /></button>
            </form>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
