import { useEffect, useRef, useState } from "react";
import CloseIcon from "./CloseIcon.jsx";
import Preview from "./Preview.jsx";
import CategoryBanner from "./CategoryBanner.jsx";
import CollectiblesIcon from "../icons/CollectiblesIcon.svg"
import NavBar from "../NavBar.jsx";
import "./App.css";
import { collectibles } from "./collectibles";
import previews from "./previews.json";
import ProfileEffectPreview from "./ProfileEffectPreview.jsx";

function usePrice(price) {
  let pricestr = new String(price);
  if (pricestr.length === 3) {
    return pricestr[0] + "." + pricestr.replace(pricestr[0], "");
  }
  if (pricestr.length === 4) {
    return (
      pricestr[0] +
      pricestr[1] +
      "." +
      pricestr.replace(pricestr[0] + pricestr[1], "")
    );
  }
  return "0.00"; // free prices for specific items.;
}

function CollectiblesPage() {
  const modalRef = useRef(null);
  const [previewAvatar, setPreviewAvatarUrl] = useState(null);
  const [previewsFlattened, setPreviewsFlattened] = useState({});

  useEffect(() => {
    setPreviewsFlattened(Object.assign({}, ...Object.values(previews)));
  }, [])

  function getProfileEffect(product) {
    let preview = previewsFlattened[product.name];

    if (!preview) {
      // It could be the case where a product has been renamed so we need to check the sku_id
      preview = Object.values(previewsFlattened).filter(preview => preview.sku_id === product.sku_id)[0];
      if (!preview) {
        return undefined;
      }
    }
    return preview;
  }

  function getProfileEffectPreviewURL(product) {
    const profileEffect = getProfileEffect(product);
    if (!profileEffect) return "";
    if (profileEffect.animation) {
      return profileEffect.animation;
    } else {
      return profileEffect.thumbnail;
    }
  }

  function openSettingsModal() {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  }

  function closeModal() {
    if (modalRef.current) modalRef.current.close();
  }

  function setPreviewAvatar(file) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    if (!file.type.startsWith("image/")) { alert("Disallowed file type."); return; }  
    fileReader.onload = () => {
      const base64 = fileReader.result;
      localStorage.preview_avatar = base64;
      setPreviewAvatarUrl(base64);
    };

    fileReader.onerror = (error) => {
      alert(error);
    };
  }

  return (
    <>
      <NavBar></NavBar>
      <button onClick={openSettingsModal} className="mt-10">Open Settings</button>
      <dialog ref={modalRef} className="modal">
        <div>
          <button className="close-button" onClick={closeModal}>
            <CloseIcon></CloseIcon>
          </button>{" "}
          <h1 className="text-white">Settings</h1>
          <div>
            <h4 className="text-white">Set the preview avatar:</h4>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setPreviewAvatar(event.target.files[0])}
            ></input>
          </div>
          <br />
          <button
            onClick={() => {
              localStorage.removeItem("preview_avatar");
              setPreviewAvatarUrl(Symbol());
            }}
            style={{ width: "200px" }}
          >
            Reset back to default.
          </button>
        </div>
      </dialog>
      <center>
        {Object.values(collectibles).reverse().map((category) => (
          <div key={category.sku_id}>
            <CategoryBanner
              key={category.sku_id}
              category={category}
            ></CategoryBanner>
            <h1>
              Avatar decorations: (
              {
                category.products.filter(
                  (product) => product.items[0].type === 0
                ).length
              }
              )
            </h1>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Summary</th>
                  <th>Preview</th>
                  <th>SKU id</th>
                  <th>Price (non-nitro price)</th>
                  <th>Price (nitro price)</th>
                  <th>Asset ID</th>
                </tr>
              </thead>
              <tbody>
                {category.products
                  .filter((product) => product.items[0].type === 0)
                  .map((product) => (
                    <tr key={product.sku_id}>
                      <th>{product.name}</th>
                      <th>{product.summary}</th>
                      <th>
                        <Preview product={product}></Preview>
                      </th>
                      <td>{product.items[0].sku_id}</td>
                      <td>
                        {usePrice(
                          product.prices[0].countryPrices.prices[0].amount
                        )}
                      </td>
                      <td>
                        {usePrice(
                          product.prices[4].countryPrices.prices[0].amount
                        )}
                      </td>
                      <td>{product.items[0].asset}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <h1>
              Profile effects (
              {
                (category.name === "Uncategorized"
                ? Array.from(Object.values(previews[category.name]) || []).concat(
                    category.products.filter((product) => product.items[0].type === 1)
                  )
                : category.products.filter((product) => product.items[0].type === 1)
                ).length
              }
              )
            </h1>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Summary</th>
                  <th>Preview</th>
                  <th>SKU id</th>
                  <th>Price (non-nitro price)</th>
                  <th>Price (nitro price)</th>
                  <th>Asset ID</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(previewsFlattened).length > 0 &&
                  (category.name === "Uncategorized"
                  ? Array.from(Object.values(previews[category.name]) || []).concat(
                      category.products.filter((product) => product.items[0].type === 1)
                    )
                  : category.products.filter((product) => product.items[0].type === 1)
                  )
                  .map((product) => (
                    <tr key={product.sku_id}>
                      <td>{product.price ? product.name : product.title}</td>
                      <td>{product.price ? product.summary : product.description}</td>
                      <td> 
                        <ProfileEffectPreview product={getProfileEffect(product)}></ProfileEffectPreview>
                      </td>
                      <td>{product.price ? product.items[0].sku_id : product.sku_id}</td>
                      <td>
                        {product.price ? usePrice(
                          product.prices[0].countryPrices.prices[0].amount
                        ) : "N/A"}
                      </td>
                      <td>
                        {product.price ? usePrice(
                          product.prices[4].countryPrices.prices[0].amount
                        ) : "N/A"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))}
      </center>
    </>
  );
}


const CollectiblesPageData = {
  path: "/collectibles",
  name: "Collectibles",
  description: "View archived collectibles categories.",
  icon: CollectiblesIcon,
  data: collectibles
}

export default CollectiblesPage;
export { CollectiblesPageData }
