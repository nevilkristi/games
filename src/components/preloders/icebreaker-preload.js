
import '../../assets/css/style.css';
const IcebreakerPreloader = () => {
    return(
        <div className="row">   
            <div className="col-lg-12" >
                <div className='card-titl' style={{
                        borderRadius: '5px',
                        height: '10%',
                        width: '100%',
                        backgroundColor: '#EEE',
                        //marginTop: '3%',
                    }}>
                <h1 className="card-title placeholder-glow"><span className="placeholder col-12" ></span></h1>
                </div>
                <hr />
                {/*
                <div className='row' style={{justifyContent: 'center'}}>
                    <div className="col-lg-4 d-flex justify-content-center">
                        <img src={cardPlaceholder} className="card-img-top" alt="..." style={{    borderRadius: '50%',height: '250px', width: '250px'}}/>
                    </div>
    </div> */}
                <div className='row' style={{justifyContent: 'center'}}>
                    <div className="col-lg-4 d-flex justify-content-center" style={{    borderRadius: '15px',height: '250px', width: '250px', backgroundColor: '#EEE'}}>
                        
                    </div>
                    </div>
                <div className='row' style={{justifyContent: 'center', marginTop:'50px'}}>
                    <div className="col-lg-6" style={{
                        borderRadius: '5px',
                        height: '10%',
                        width: '250px',
                        backgroundColor: '#EEE',
                    }}><h1 className="card-title placeholder-glow"><span className="placeholder col-12"></span></h1></div>
                </div>
                <div className='row' style={{justifyContent: 'center', }}>
                    <div className="col-lg-4" ><h1 className="card-title placeholder-glow"><span className="placeholder col-12"></span></h1></div>
                </div>
                <div className='row' style={{justifyContent: 'center'}}>
                    <div className="col-lg-4" style={{
                        borderRadius: '5px',
                        height: '10%',
                        width: '250px',
                        backgroundColor: '#EEE',
                    }}><h1 className="card-title placeholder-glow"><span className="placeholder col-12"></span></h1></div>
                </div>
                <div className="row" style={{ justifyContent: 'space-evenly', marginTop:'50px' }}>
                    <button className="btn  disabled placeholder col-4"><span className="placeholder col-12"></span></button>
                </div>
            </div>
        </div>
    )
}

export default IcebreakerPreloader
