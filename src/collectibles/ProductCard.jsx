import Preview from './Preview';
import { usePrice } from '.';
import { previews } from './collectibles';
import { useState } from 'react';

function numberToColour(number) {
    var b = Math.floor(number / (256 * 256));
    var g = Math.floor(number / 256) % 256;
    var r = number % 256;

    //return [b, g, r];
    return `rgb(${b},${g},${r})`;
}

export default function ProductCard({ product, isProfileEffect }) {
    const colors = product?.styles?.background_colors
        ? product.styles.background_colors.map((color) => numberToColour(color))
        : ['rgb(7,7,7)', 'rgb(3,3,3)'];
    const gradient = `linear-gradient(${colors.join(',')}) border-box border-box`;
    const assetLink = !isProfileEffect
        ? `https://cdn.discordapp.com/avatar-decoration-presets/${product.items[0].asset}.png?size=160&amp&passthrough=true`
        : previews[product.sku_id];
    const [isButtonsHidden, setIsButtonsHidden] = useState(true);

    return (
        <>
            <div
                id={product.sku_id}
                className="collectibles-card"
                style={{ '--card-gradient': gradient }}
                onMouseEnter={() => setIsButtonsHidden(false)}
                onMouseLeave={() => setIsButtonsHidden(true)}
            >
                <Preview product={product} isProfileEffect={isProfileEffect}></Preview>
                <br></br>
                <div className="card-text">
                    <h1 className="font-bold font-6xl">{product.name}</h1>
                    <p className="break-words">{product.summary}</p>
                </div>
                <div className="flex gap-2">
                    <p className="line-through font-light">
                        ${usePrice(product.prices[0].countryPrices.prices[0].amount)}
                    </p>
                    <p className="font-bold">${usePrice(product.prices[4].countryPrices.prices[0].amount)}</p>
                </div>
                <div style={{ display: isButtonsHidden ? 'none' : 'flex', gridGap: '10px' }} className="buttons">
                    <button
                        onClick={() => navigator.clipboard.writeText(product.sku_id)}
                        className="button_collectibles"
                        style={{
                            background: '#5965F2',
                            width: '96px',
                            height: '38px',
                            minWidth: '96px',
                            minHeight: '38px',
                        }}
                    >
                        Copy SKU ID
                    </button>
                    <button
                        onClick={() => window.open(assetLink)}
                        className="button_collectibles"
                        style={{
                            background: '#5965F2',
                            width: '96px',
                            height: '38px',
                            minWidth: '96px',
                            minHeight: '38px',
                        }}
                    >
                        Open asset link
                    </button>
                </div>
            </div>
        </>
    );
}
