import NavBar from '../NavBar';
import Preview from '../collectibles/Preview';
import data from './data.json';
import { collectibles } from '../collectibles/collectibles';
import QuestsIcon from '../icons/QuestsIcon.svg';

function getProduct(SKU_ID) {
    return collectibles
        .map((category) => category.products)
        .flat()
        .find((product) => product.sku_id === SKU_ID);
}

function QuestsPage() {
    return (
        <>
            <NavBar></NavBar>
            <div className="mt-10 mb-10">
                <h1>Quests archives:</h1>
                <div className="quests">
                    {data.map((quest) => {
                        const assetBaseUrl = `https://cdn.discordapp.com/assets/quests/${
                            quest.config.quest_id || quest.config.id
                        }`;
                        return (
                            <div className="card w-96 bg-base-100 shadow-xl">
                                <figure>
                                    <video
                                        playsinline
                                        poster={`${assetBaseUrl}/${quest.config.assets.hero}`}
                                        style={{ opacity: 1 }}
                                    />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">
                                        {quest.config.rewards_config.rewards[0]?.tag === 3 ||
                                        quest.config.rewards_config.rewards[0]?.type === 3 ? (
                                            <Preview
                                                product={getProduct(quest.config.rewards_config.rewards[0].sku_id)}
                                            ></Preview>
                                        ) : (
                                            <img
                                                src={`${assetBaseUrl}/${quest.config.assets.reward_tile}`}
                                                className="quest-reward-logo"
                                            ></img>
                                        )}
                                        {quest.config.messages.quest_name} Quest — {quest.config.application_name}
                                    </h2>
                                    <p>
                                        Stream {quest.config.qpplication_name} for{' '}
                                        {quest.config.stream_duration_requirement_minutes} minutes to get{' '}
                                        <b>{quest.config.messages.reward_name}</b>
                                    </p>
                                    <div className="card-actions justify-end">
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => window.open(quest.config.get_game_link, '_blank')}
                                        >
                                            Get game
                                        </button>
                                        <button
                                            className="btn btn-success"
                                            disabled={!quest.config.rewards_config.rewards[0]?.sku_id}
                                            onClick={() =>
                                                navigator.clipboard.writeText(
                                                    quest.config.rewards_config.rewards[0]?.sku_id,
                                                )
                                            }
                                        >
                                            Copy reward sku id
                                        </button>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() =>
                                                navigator.clipboard.writeText(JSON.stringify(quest, null, 4))
                                            }
                                        >
                                            Copy quest data
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

const QuestsPageData = {
    path: '/quests',
    name: 'Quests',
    description: 'View archived quests.',
    icon: QuestsIcon,
    data,
};
export default QuestsPage;
export { QuestsPageData };
