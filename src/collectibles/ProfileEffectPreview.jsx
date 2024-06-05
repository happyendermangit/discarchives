import { useState } from "react";
const ProfileEffectPreview = ({ product: profileEffect }) => {
	const [timestamp, setTimestamp] = useState(Date.now());

	return (
		profileEffect && (
			<div style={{ position: "relative", width: "fit-content", height: "500px", overflow: "hidden" }} onMouseOver={(e) => setTimestamp(Date.now())}>
				{profileEffect.effects.map((effect, index) => (
					<img
						key={index}
						src={`${effect.src}?t=${timestamp}`}
						style={{
							position: index === 0 ? "relative" : "absolute",
							top: effect.position.y,
							left: effect.position.x,
							width: "100%",
							height: "auto",
							zIndex: effect.zIndex,
							objectFit: "contain",
						}}
						alt={`Effect ${index}`}
					/>
				))}
			</div>
		)
	);
};

export default ProfileEffectPreview;
