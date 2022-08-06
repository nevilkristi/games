import Header from "components/common/Header/Header";
import PlaceHolderCard from "./placeholder-card";

const PreloaderApp = ({ url = "/", header = true }) => {
  const urls = ["", "games", "accounts", "icebreaker", "tool"];
  return (
    <>
      {header && <Header />}
      <section className="grow-game bg-light-gray bg-shap">
        <div className="container  p-tb-40">
          <div className="row">
            <div className="col-lg-3">
              <div className="card" aria-hidden="true">
                <div className="card-body">
                  <h3 className="card-title placeholder-glow">
                    <span className="placeholder col-12"></span>
                  </h3>

                  <h3 className="card-title placeholder-glow">
                    <span className="placeholder col-8"></span>
                  </h3>
                  <p className="card-text placeholder-glow">
                    <span className="placeholder col-4"></span>
                  </p>
                  <p className="card-text placeholder-glow">
                    <span className="placeholder col-4"></span>
                  </p>
                  <p className="card-text placeholder-glow">
                    <span className="placeholder col-4"></span>
                  </p>
                  <p className="card-text placeholder-glow">
                    <span className="placeholder col-4"></span>
                  </p>
                  <p className="card-text placeholder-glow">
                    <span className="placeholder col-4"></span>
                  </p>
                  <hr />

                  <h3 className="card-title placeholder-glow">
                    <span className="placeholder col-8"></span>
                  </h3>
                  <p className="card-text placeholder-glow">
                    <span className="placeholder col-2 preloader-mr-10"></span>
                    <span className="placeholder col-2 preloader-mr-10"></span>
                    <span className="placeholder col-2 preloader-mr-10"></span>
                    <span className="placeholder col-2 preloader-mr-10"></span>
                    <span className="placeholder col-2 preloader-mr-10"></span>
                  </p>

                  <h3 className="card-title placeholder-glow">
                    <span className="placeholder col-8"></span>
                  </h3>
                  <p className="card-text placeholder-glow">
                    <span className="placeholder col-2 preloader-mr-10"></span>
                    <span className="placeholder col-2 preloader-mr-10"></span>
                    <span className="placeholder col-2 preloader-mr-10"></span>
                    <span className="placeholder col-2 preloader-mr-10"></span>
                    <span className="placeholder col-2 preloader-mr-10"></span>
                  </p>

                  <h3 className="card-title placeholder-glow">
                    <span className="placeholder col-8"></span>
                  </h3>
                  <p className="card-text placeholder-glow">
                    <span className="placeholder col-2 preloader-mr-10"></span>
                    <span className="placeholder col-2 preloader-mr-10"></span>
                    <span className="placeholder col-2 preloader-mr-10"></span>
                    <span className="placeholder col-2 preloader-mr-10"></span>
                    <span className="placeholder col-2 preloader-mr-10"></span>
                  </p>

                  <h3 className="card-title placeholder-glow">
                    <span className="placeholder col-8"></span>
                  </h3>
                  <h3 className="card-title placeholder-glow">
                    <span className="placeholder col-12"></span>
                  </h3>
                  <p className="card-text placeholder-glow">
                    <span className="placeholder col-2 preloader-mr-10"></span>
                    <span className="placeholder col-2 preloader-mr-10"></span>
                    <span className="placeholder col-2 preloader-mr-10"></span>
                    <span className="placeholder col-2 preloader-mr-10"></span>
                    <span className="placeholder col-2 preloader-mr-10"></span>
                  </p>

                  <div
                    className="row"
                    style={{ justifyContent: "space-evenly" }}
                  >
                    <button className="btn  disabled placeholder col-4">
                      <span className="placeholder col-12"></span>
                    </button>
                    <button className="btn  disabled placeholder col-4">
                      <span className="placeholder col-12"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              <h1 className="card-title placeholder-glow">
                <span className="placeholder col-12"></span>
              </h1>
              <h1 className="card-title placeholder-glow">
                <span className="placeholder col-6"></span>
              </h1>

              <div className="row">
                {urls.indexOf(url.replace("/", "")) === 0 ? (
                  <PlaceHolderCard loop={6} />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PreloaderApp;
