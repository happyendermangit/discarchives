const PageSwitcher = ({ data }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl mb-10">
      <figure>
        <img src={data.icon} alt="Page icon" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{data.name}</h2>
        <p>{data.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={() => location.pathname = data.path}>
            View
          </button>
          <button className="btn btn-success" onClick={() => navigator.clipboard.writeText(JSON.stringify(data.data, null,4))}>
            Copy Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageSwitcher;
