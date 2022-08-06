const LeftPreloader = () => {
    return (
        <div className="card" aria-hidden="true">
            <div className="card-body">
                <h3 className="card-title placeholder-glow">
                    <span className="placeholder col-12"></span>
                </h3>

                <h3 className="card-title placeholder-glow"><span className="placeholder col-8"></span></h3>
                <p className="card-text placeholder-glow"><span className="placeholder col-4"></span></p>
                <p className="card-text placeholder-glow"><span className="placeholder col-4"></span></p>
                <p className="card-text placeholder-glow"><span className="placeholder col-4"></span></p>
                <p className="card-text placeholder-glow"><span className="placeholder col-4"></span></p>
                <p className="card-text placeholder-glow"><span className="placeholder col-4"></span></p>
                <hr />

                <h3 className="card-title placeholder-glow"><span className="placeholder col-8"></span></h3>
                <p className="card-text placeholder-glow">
                    <span className="placeholder col-2 preloader-mr-10"></span>
                    <span className="placeholder col-2 preloader-mr-10"></span>
                    <span className="placeholder col-2 preloader-mr-10"></span>
                    <span className="placeholder col-2 preloader-mr-10"></span>
                    <span className="placeholder col-2 preloader-mr-10"></span>
                </p>

                <h3 className="card-title placeholder-glow"><span className="placeholder col-8"></span></h3>
                <p className="card-text placeholder-glow">
                    <span className="placeholder col-2 preloader-mr-10"></span>
                    <span className="placeholder col-2 preloader-mr-10"></span>
                    <span className="placeholder col-2 preloader-mr-10"></span>
                    <span className="placeholder col-2 preloader-mr-10"></span>
                    <span className="placeholder col-2 preloader-mr-10"></span>
                </p>

                <h3 className="card-title placeholder-glow"><span className="placeholder col-8"></span></h3>
                <p className="card-text placeholder-glow">
                    <span className="placeholder col-2 preloader-mr-10"></span>
                    <span className="placeholder col-2 preloader-mr-10"></span>
                    <span className="placeholder col-2 preloader-mr-10"></span>
                    <span className="placeholder col-2 preloader-mr-10"></span>
                    <span className="placeholder col-2 preloader-mr-10"></span>
                </p>

                <h3 className="card-title placeholder-glow"><span className="placeholder col-8"></span></h3>
                <h3 className="card-title placeholder-glow"><span className="placeholder col-12"></span></h3>
                <p className="card-text placeholder-glow">
                    <span className="placeholder col-2 preloader-mr-10"></span>
                    <span className="placeholder col-2 preloader-mr-10"></span>
                    <span className="placeholder col-2 preloader-mr-10"></span>
                    <span className="placeholder col-2 preloader-mr-10"></span>
                    <span className="placeholder col-2 preloader-mr-10"></span>
                </p>

                <div className="row" style={{ justifyContent: 'space-evenly' }}>
                    <button className="btn  disabled placeholder col-4"><span className="placeholder col-12"></span></button>
                    <button className="btn  disabled placeholder col-4"><span className="placeholder col-12"></span></button>
                </div>
            </div>
        </div>
    )
}

export default LeftPreloader