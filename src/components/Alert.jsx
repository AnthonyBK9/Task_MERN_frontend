import React from 'react'

const Alert = ({alert}) => {
  return (
    <div className={`${alert.error ? 'from-red-400 to-red-600' : 'from-sky-400 to-sky-600'} bg-gradient-to-br text-center p-2 rounded-xl text-white font-bold text-sm my-5 uppercase`}>
        {alert.msg}
    </div>
  )
}

export default Alert