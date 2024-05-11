const NavBar = () => {
  return (
    <div className="navbar bg-base-100 nav">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">DiscArchive</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/">Home page</a>
          </li>
          <li>
            <a href="https://github.com/happyendermangit/discarchives">Github</a>
          </li>
          <li>
            <details className="archives">
              <summary>Archives</summary>
              <ul className="p-2 bg-base-100 rounded-t-none">
                <li>
                  <a href="/collectibles">Collectibles</a>
                </li>
                <li>
                  <a href="/quests">Quests</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};


export default NavBar
