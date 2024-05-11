import { CollectiblesPageData } from "../collectibles";
import { QuestsPageData } from "../quests"
import PageSwitcher from "./PageSwitcher";
import NavBar from "../NavBar";

function HomePage() {
  return (
    <>
      <NavBar></NavBar>
      <div className="mt-10 mb-10">
        <h1 className="text-6xl font-bold">DiscArchives</h1>
        <p>A discord archives browser.</p>
      </div>
      <div className="pages">
        <PageSwitcher data={CollectiblesPageData}></PageSwitcher>
        <PageSwitcher data={QuestsPageData}></PageSwitcher>
      </div>
    </>
  );
}

export default HomePage;
