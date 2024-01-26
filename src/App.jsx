import { useEffect, useState } from "react"
const url = 'http://localhost:3000/products'

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [id, setId] = useState(1);


  const handleSubmit = async (e) =>{
    e.preventDefault();

    const products = {
      name,
      price,
      id,
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(products)
    })
    setName("")
    setPrice("")
    setId(`${id} + 1`)

    const addedProduct = await res.json();
    setProducts((prevProducts) => [...prevProducts, addedProduct]);

  }

  useEffect(() =>{
    async function getData(){
      const res = await fetch(url)

      const data = await res.json()

      setProducts(data)
    }
    getData()
  },[])

  return (
    <>
      <h1>Lista de Produtos</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name} - {product.price}</li>
      ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)}/>
        <input type="submit" />
      </form>
    </>
  )
}

export default App
