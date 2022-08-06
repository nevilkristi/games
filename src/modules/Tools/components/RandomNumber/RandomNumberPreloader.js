import React from 'react'
import cardPlaceholder from 'assets/img/placeholder-card.svg'
import { RowPreloader } from 'components/preloders'
const RandomNumberPreloader=()=>{
  return (
    <div className="row">   
    <div className="col-lg-12">

        
    <div style={{display:"flex", justifyContent:"center", marginBottom:"20px", marginTop:"40px"}}>
            <div className="" style={{width:"30%"}}>
              <RowPreloader height="50px" />
            </div>
            <div className="ml-2" style={{width:"30%"}}>
              <RowPreloader height="50px" />
            </div>
          </div>
        <div className='row' style={{justifyContent: 'center'}}>
            <div className="col-lg-4 d-flex justify-content-center">
                <img src={cardPlaceholder} className="card-img-top" alt="..." style={{    borderRadius: '50%',height: '225px', width: '225px'}}/>
            </div>
        </div>

        <div className='row mt-5' style={{justifyContent: 'center'}}>
            <div className="col-sm-6 "><h1 className="card-title placeholder-glow"><span className="placeholder col-12" style={{height :"75px"}}></span></h1></div>
        </div>
        <div className="row" style={{ justifyContent: 'space-evenly', marginTop:'50px' }}>
            <button className="btn  disabled placeholder col-2"><span className="placeholder col-6"></span></button>
        </div>
    </div>
</div>
  )
}

export default RandomNumberPreloader
