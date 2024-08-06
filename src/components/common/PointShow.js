import React from 'react'
import points from '../../points.json'

const PointShow = ({name}) => {

    return (<>
        {points[name].map((item,i) =>
            <div key={i}>
                <div className='d-flex gap-2'>
                    <div className='fs-5 fw-medium'>{i+1}.</div>
                    <div>
                        <div className='fs-5 fw-medium'>{item.title}</div>
                        <div className='d-flex gap-2'>
                            <div className='h-8 w-100 max-w-8 mt-2 bg-dark rounded-circle' />
                            <div className='text-body-secondary' dangerouslySetInnerHTML={{ __html: item.description }}/>
                        </div>
                    </div>
                </div>
                {points[name].length-1 != i &&<div className='deviderLine' />}
            </div>
        )}


    </>

    )
}

export default PointShow
