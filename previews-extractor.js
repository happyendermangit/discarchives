// Before running this script, make sure your collectibles are up to date
import { collectibles } from "./src/collectibles/collectibles.js";
// Make sure you download and save the response from https://discord.com/api/v9/user-profile-effects to the following file:
import userProfileEffects from "./src/collectibles/user-profile-effects.json" assert { type: 'json' };
import * as fs from 'fs';

const PREVIEWS_PATH = `./src/collectibles/previews.json`;

const effectCategorySKUMap = {}; // [Profile Effect sku_id] -> Category sku_id
for (const category of Object.values(collectibles)) {
	const profileEffectSKUs = category.products.flatMap(product => product.items).filter(item => item.type === 1).map(item => item.sku_id);

	for (const sku of profileEffectSKUs) {
		effectCategorySKUMap[sku] = category.sku_id;
	}
}



// Now create a new object that maps the previews by category
const newPreviews = {}; // [Category] -> [Previews]

// Load the existing data to be updated if applicable
if (fs.existsSync(PREVIEWS_PATH)) {
	const existingPreviews = JSON.parse(fs.readFileSync(PREVIEWS_PATH));
	Object.assign(newPreviews, existingPreviews);
}

const ANIMATION_REGEX = /intro((-|_)\w+)?.png/i
for (const effect of userProfileEffects["profile_effect_configs"]) {
	const effectName = effect.title;
	const effectSKU = effect.sku_id;
	// There are some instances where the effect is not in the collectibles at all so lets just use the uncategorized category
	const categorySKU = effectCategorySKUMap[effectSKU] || "1217175518781243583";
	const categoryName = Object.values(collectibles).filter(category => category.sku_id === categorySKU)[0].name;
	if (!newPreviews[categoryName]) {
		newPreviews[categoryName] = {};
	}
	newPreviews[categoryName][effectName] = {
		sku_id: effectSKU, // Keep the SKU for cases where the effect name has been renamed like Feelin' 90s -> Feelin' 70s
		thumbnail: effect.thumbnailPreviewSrc,
		animation: effect.effects.filter(effect => ANIMATION_REGEX.test(effect.src))[0]?.src ?? effect.effects.filter(effect => /loop.png/i.test(effect.src))[0]?.src ?? undefined,
		effects: [...effect.effects]
	};
}

fs.writeFileSync(PREVIEWS_PATH, JSON.stringify(newPreviews, null, 2));