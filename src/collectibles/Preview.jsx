import React, { useState, useEffect, useRef } from 'react';
import previewAvatar from './assets/preview_avatar.png';
import { previews } from './collectibles';

const Preview = (props) => {
    const [imgSrc, setImgSrc] = useState('');
    const imgRef = useRef(null);

    // Intersection Observer to lazily load images
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const newSrc = `https://cdn.discordapp.com/avatar-decoration-presets/${props.product.items[0].asset}.png?size=160&amp&passthrough=false`;
                        setImgSrc(newSrc);
                        observer.unobserve(imgRef.current);
                    }
                });
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.01,
            },
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        // Cleanup function
        return () => {
            if (imgRef.current) {
                observer.unobserve(imgRef.current);
            }
        };
    }, [props.product.items]);
    return !props.isProfileEffect ? (
        <div
            className="wrapper-3Un6-K avatar-jvUUbt"
            role="img"
            aria-label="Avatar"
            aria-hidden="false"
            onMouseEnter={(event) => {
                setImgSrc(imgSrc.replace('passthrough=false', 'passthrough=true'));
            }}
            onMouseLeave={(event) => {
                setImgSrc(imgSrc.replace('true', 'false'));
            }}
            style={{ width: '120px', height: '120px' }}
        >
            <svg width="120" height="120" viewBox="0 0 120 120" className="mask-1y0tyc svg-1G_H_8" aria-hidden="true">
                <foreignObject x="0" y="0" width="120" height="120" mask="url(#svg-mask-avatar-default)">
                    <div className="avatarStack-3Bjmsl">
                        <img
                            src={localStorage.preview_avatar ? localStorage.preview_avatar : previewAvatar}
                            alt=" "
                            style={{ borderRadius: '50%' }}
                            className="avatar-31d8He"
                            aria-hidden="true"
                        />
                    </div>
                </foreignObject>
            </svg>
            <svg width="144" height="144" viewBox="0 0 144 144" className="avatarDecoration-2Wb1Au" aria-hidden="true">
                <foreignObject x="0" y="0" width="144" height="144" mask="url(#)">
                    <div className="avatarStack-3Bjmsl">
                        <img
                            className="avatar-31d8He"
                            src={imgSrc}
                            ref={imgRef}
                            alt="Avatar decoration."
                            aria-hidden="true"
                        />
                    </div>
                </foreignObject>
            </svg>
        </div>
    ) : (
        <div className="collectibles_profile_effects_preview">
            <div>
                <img src={previews[props.product.sku_id] ?? ''}></img>
            </div>
        </div>
    );
};
export default Preview;
