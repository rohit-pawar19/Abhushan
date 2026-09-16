import { products } from '../data/catalog'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
export default function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    const product = products.find((item) => pathname === '/products/' + item.id)
    const name = product
      ? product.name
      : pathname === '/'
        ? 'Timeless Indian Jewellery'
        : pathname.slice(1).replace(/^./, (c) => c.toUpperCase())
    document.title = `Abhusan | ${name}`
  }, [pathname])
  return null
}
