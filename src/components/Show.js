import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, getDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { async } from '@firebase/util'
const MySwal = withReactContent(Swal)

const Show = () => {
    // hooks
    const [products, setProducts] = useState( [] )

    //referencia
    const productsCollection = collection(db, "products")

    //mostrar TodOs
    const getProducts = async () => {
        const data = await getDocs(productsCollection)
        //console.log(data.docs)
        setProducts(
            data.docs.map( (doc) => ( {...doc.data(), id:doc.id})) 
    )
    //console.log(products)
    }

    //eliminar 
    const deleteProduct = async (id) => {
      const productDoc = doc(db, "products", id)
      await deleteDoc(productDoc)
      getProducts()
    }
    //confirmacion
const confirmDelete = (id) => {
  MySwal.fire({
    title:'¿Remove the product?',
    text:"You won't be able to revert this!",
    icon:'warning',
    showCancelButton:true,
    confirmButtonColor:'#d33',
    cancelButtonColor:'#3085d6',
    confirmButtonText:'Yes, delete it!'
  }).then( (result) => {
    if(result.isConfirmed){
      deleteProduct(id)
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
}
    //Usefefect
    useEffect( () => {
        getProducts()
        // eslint-disable-next-line
    }, [] )
    
    //devolver
  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <div className='d-grid gap-2'>
              <Link to="/create" className='btn btn-secondary mt-2 mb-2'>Create</Link>
            </div>

            <table className='table table-dark table-hover'>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                { products.map ((product) => (
                  <tr key={product.id}>
                    <td>{product.description}</td>
                    <td>{product.stock}</td>
                    <td>
                      <Link to={`/edit/${product.id}`} className='btn btn-light'><i className="fa-solid fa-pen"></i></Link>
                      <button onClick={ () => { confirmDelete(product.id) } } className='btn btn-danger'><i className="fa-solid fa-trash"></i></button>
                    </td>
                  </tr>
                ) ) }
              
              </tbody>

            </table>

          </div>
        </div>
      </div>
    </>
  )
}

export default Show
