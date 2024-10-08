import Footer from "./Parts/Footer"

const Checkout = () => {
  // const [checkout, setCheckout] = useState<string[]>(JSON.parse(localStorage.getItem("checkout") as string) || [])
  const checkout: string[] = JSON.parse(localStorage.getItem("checkout") as string) || []
  return (
    <div className="content-layout-margin mb-16 md:mb-0 md:mt-16 pt-16">
      <div>
        <h1 className='text-5xl text-wrench-neutral-white mt-12 font-bold'>Checkout</h1>
      </div>
      <div>
        {checkout.map(item => <div className="">{item}</div>)}
      </div>
      <Footer />
    </div>
  )
}

export default Checkout