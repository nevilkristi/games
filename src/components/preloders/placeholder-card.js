import cardPlaceholder from "assets/img/placeholder-card.svg";

const PlaceHolderCard = ({
  loop = window.innerWidth <= 1400 ? 4 : 6,
  col = window.innerWidth <= 1400 ? 6 : 4,
  isPlaneCard = false,
}) => {
  let t = [];
  for (let i = 0; i < loop; i++) {
    t.push(i);
  }

  return t.map((i) => (
    <div key={i} className={`col-md-${col}`} style={{ marginBottom: "25px" }}>
      <div className="card" aria-hidden="true">
        <div className="card-body">
          <img
            src={cardPlaceholder}
            className="card-img-top"
            alt="..."
            style={{ height: "150px" }}
          />

          <div className="row mt-3">
            <div
              className="col-md-12"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <p className="placeholder col-3"></p>
              <p className="placeholder col-3"></p>
              <p className="placeholder col-2"></p>
              <p className="placeholder col-2"></p>
            </div>
            <div
              className="col-md-12 mt-1"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <p className="placeholder col-3"></p>
              <p className="placeholder col-3"></p>
              <p className="placeholder col-2"></p>
              <p className="placeholder col-2"></p>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-12">
              <h3 className="card-title placeholder-glow">
                <span
                  className="placeholder col-12"
                  style={{ width: "160px" }}
                ></span>{" "}
              </h3>
            </div>
          </div>
          <p className="card-text placeholder-glow">
            <span className="placeholder col-7"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-6"></span>
            <span className="placeholder col-8"></span>
          </p>
          <div
            className="col-md-12 mt-1"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <p className="placeholder col-3"></p>
            <p className="placeholder col-2"></p>
            <p className=" col-2"></p>
            <p className=" col-2"></p>
          </div>
          <p className="card-text placeholder-glow">
            <span
              className="placeholder col-4"
              style={{ height: "35px" }}
            ></span>
          </p>
          <hr />
        </div>
      </div>
    </div>
  ));
};

export default PlaceHolderCard;
