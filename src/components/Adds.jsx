import React from 'react'
import Add1 from '../../src/images/add1.jpg'
import Add2 from '../../src/images/add2.jpg'
const Adds = () => {
  return (
    <div className='add-container'>
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-6">
                    <div className="add-wrapper" style={{ backgroundImage: `url(${Add1})` }}>
                    <div className="data">
                        <p className="title">
                        Celebrate Love: Find the Perfect Gift for Your Valentine! 💖
                        </p>
                    </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="add-wrapper" style={{ backgroundImage: `url(${Add2})` }}>
          <div className="data">
            <p className="title">
            Make This Valentine’s Day Unforgettable! 💘 Shop Now!
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