import Layout from '@/components/LayoutComponent/Layout'
import React from 'react'
import CartCardComponent from '@/components/CartComponent/CartCardComponent'

const Index = () => {
  return (
    <Layout className="h-screen bg-blue-700 grid grid-cols-2 grid-rows-2">
      <CartCardComponent className="col-span-1 row-span-2 m-5">
        testing
      </CartCardComponent>
      <CartCardComponent className="col-span-1 row-span-1 m-5">
        Summary
      </CartCardComponent>
    </Layout>
  )
}

export default Index
