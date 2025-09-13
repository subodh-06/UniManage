import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div>unauthorize access please
        <Link href={"/"}>login</Link>
    </div>
  )
}

export default page