import React from 'react'
import '../../css/component/labellistgrid.css'

export default function LabelListGrid({labelListArr, labelTopic, labelsClickHandler}) {

  // useEffect(() => {console.log(labelListArr);
  // }, [labelListArr]);

  return (
    <div className='labellistgrid-main'>
    <h3>Explore</h3>
    <div>
      <h5>populer by genre</h5>
      <div className='labels-div'>
        {
            labelListArr && labelListArr.map((item, i) => (
                <p key={i} onClick={() => {labelsClickHandler(item)}}>{labelTopic} {item}</p>
            ))
        }
      </div>
    </div>
  </div>
  )
}
