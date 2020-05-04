import React from 'react';

const OptionSelector = (props) => {
  return (
    <div>
        {
          props.options.map((v, i) => {
            return (
              <React.Fragment key={i}>
                <button className={`btn ${v===props.currentOption ? 'btn-warning' : 'btn-primary'}`} onClick={(e) => props.handleOptionChanged(v)}>{v}</button>{' '}
              </React.Fragment>
            )
          })
        }
      </div>
  )
}

export default OptionSelector