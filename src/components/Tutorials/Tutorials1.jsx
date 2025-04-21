import React from 'react'
import './Tutorial.css'
export default function Tutorials1() {
  return (
    <>
    <div className="tutorials py-5">
        <div className="container h-100 py-5">

            <div className="row g-lg-5 g-0 justify-content-center align-items-center">
                   <div className="col-lg-4 col-md-6 col-12">
                        <div className="tutorials__content">
                             <div className="tutorials__content__title">
                                  <h1 className='text-light'>Build Skills with 
                                  Online tutorial</h1>
                                  <p className='py-3 fs-6'>We denounce with righteous indignation and dislike men who are so beguiled and demoralized that cannot trouble.</p>
                                  <button className='btn btn-danger'>Posts comment</button>
                              </div>
                        </div>

                   </div>
                   <div className="col-lg-8 col-md-6 col-12">
                        <div className="tutorials__content__img">
                            <img src='/imgs/tutorialImg11.png' alt="tutorials" className='w-100' />
                            </div>
                   </div>
            </div>
        </div>
    </div>
    </>
  )
}
