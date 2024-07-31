import React from 'react'

const CartCardComponent = ({ children, className }) => {
  return (
    <div className={`rounded-lg border bg-white m-10 text-black ${className}`}>
      {children}
    </div>
  )
}

export default CartCardComponent
