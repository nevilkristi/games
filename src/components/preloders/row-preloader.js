const RowPreloader = ({ loop = 1, height = "50px", width = "100%" }) => {
  let t = [];
  for (let i = 0; i < loop; i++) {
    t.push(i);
  }
  return t.map((i) => (
    <div key={i}>
      <div
        className="card-titl"
        style={{
          borderRadius: "5px",
          height: "10%",
          width: "100%",
          backgroundColor: "#ddd",
        }}
      >
        <h1 className="card-title placeholder-glow">
          <span
            className="placeholder"
            style={{ minHeight: `${height}` }}
          ></span>
        </h1>
      </div>
    </div>
  ));
};

export default RowPreloader;
