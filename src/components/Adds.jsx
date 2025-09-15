import React from 'react'
import Add1 from '../../src/images/summer.jpg'
import Add2 from '../../src/images/school-add.jpg'
const Adds = () => {
  return (
    <div className='add-container'>
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-6">
                    <div className="add-wrapper" style={{ backgroundImage: `url(${Add2})` }}>
                    <div className="data">
                        <p className="title">
                        Back-to-School, Back to Savings
                        </p>
                    </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="add-wrapper" style={{ backgroundImage: `url(${Add1})` }}>
          <div className="data">
            <p className="title">
            Summer Savings for the Whole Family
            </p>
          </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Adds