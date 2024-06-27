import { useRef, useState } from 'react';
import { collectibles, previews } from './collectibles.js';
import CategoryBanner from './CategoryBanner.jsx';
import CollectiblesIcon from '../icons/CollectiblesIcon.svg';
import NavBar from '../NavBar.jsx';
import './App.css';
import ProductCard from './ProductCard.jsx';
import SettingsDialog from './SettingsDialog.jsx';

function getProfileEffectPreview(product) {
    let preview = previews[product.name];
    return preview ?? '';
}

export function usePrice(price) {
    let pricestr = new String(price);
    if (pricestr.length === 3) {
        return pricestr[0] + '.' + pricestr.replace(pricestr[0], '');
    }
    if (pricestr.length === 4) {
        return pricestr[0] + pricestr[1] + '.' + pricestr.replace(pricestr[0] + pricestr[1], '');
    }
    return '0.00'; // free prices for specific items.;
}

// for bundles
function calculateDiscountPercentage(product) {}

function CollectiblesPage() {
    const modalRef = useRef(null);
    const [previewAvatar, setPreviewAvatarUrl] = useState(null);

    function openSettingsModal() {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    }

    return (
        <>
            <NavBar></NavBar>
            <button onClick={openSettingsModal} className="mt-10">
                Open Settings
            </button>
            <SettingsDialog modalRef={modalRef} setPreviewAvatarUrl={setPreviewAvatarUrl}></SettingsDialog>
            <center>
                {collectibles.map((category) => (
                    <div key={category.sku_id}>
                        {console.log(category)}
                        <CategoryBanner key={category.sku_id} category={category}></CategoryBanner>

                        <div className="avatar-decorations">
                            <h1 className="font-bold text-3xl">
                                Avatar decorations: (
                                {category.products.filter((product) => product.items[0].type === 0).length})
                            </h1>

                            <div className="grid">
                                {category.products
                                    .filter((product) => product.items[0].type === 0)
                                    .map((product) => (
                                        <ProductCard product={product} isProfileEffect={false}></ProductCard>
                                    ))}
                            </div>
                        </div>

                        <div className="profile-effects">
                            <h1 className="font-bold text-3xl">
                                Profile effects (
                                {category.products.filter((product) => product.items[0].type === 1).length})
                            </h1>
                            <div className="grid">
                                {category.products
                                    .filter((product) => product.items[0].type === 1)
                                    .map((product) => (
                                        <ProductCard product={product} isProfileEffect={true}></ProductCard>
                                    ))}
                            </div>
                        </div>
                    </div>
                ))}
            </center>
        </>
    );
}

const CollectiblesPageData = {
    path: '/collectibles',
    name: 'Collectibles',
    description: 'View archived collectibles categories.',
    icon: CollectiblesIcon,
    data: collectibles,
};

export default CollectiblesPage;
export { CollectiblesPageData };
