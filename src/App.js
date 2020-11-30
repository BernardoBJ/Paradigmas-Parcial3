import { db } from './firebase'
import { useState, useEffect } from 'react'

function App() {

  const [libros, setLibros] = useState([])
  const [titulo, setTitulo] = useState([])
  const [autor, setAutor] = useState([])
  const [clasificacion, setClasificacion] = useState([])
  const [editorial, setEditorial] = useState([])
  const [modoEdicion, setModoEdicion] = useState(false)
  const [modoEliminar, setModoEliminar] = useState(false)
  const [id, setId] = useState('')

  const getLibros = async () => {
    const data = await db.collection('libros').get()
    const arrayLibros = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    setLibros(arrayLibros)
  }

  useEffect(() => {
    getLibros()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const limpiarIns = () => {
    setAutor("")
    setClasificacion("")
    setEditorial("")
    setTitulo("")
    setId("")
  }

  const agregarLibro = async (e) => {
    e.preventDefault()
    await db.collection('libros').add({
      titulo: titulo,
      autor: autor,
      editorial: editorial,
      clasificacion: clasificacion,
    })
    limpiarIns()
    getLibros()
  }

  const activarEdicion = (item) => {
    setModoEdicion(true)
    if (!modoEdicion) {
      setTitulo(item.titulo)
      setAutor(item.autor)
      setEditorial(item.editorial)
      setClasificacion(item.clasificacion)
      setId(item.id)
    } else {
      setModoEdicion(false)
      limpiarIns()
    }

  }

  const activarEliminar = (item) => {
    setModoEliminar(!modoEliminar)
  }

  const editarLibro = async (e) => {
    e.preventDefault()
    await db.collection('libros').doc(id).update({
      titulo: titulo,
      autor: autor,
      editorial: editorial,
      clasificacion: clasificacion,
    })
    setModoEdicion(false)
    limpiarIns()
    getLibros()
  }

  const eliminarLibro = async (id) => {
    await db.collection('libros').doc(id).delete()
    activarEliminar()
    getLibros()
  }

  return (
    <div className="container">
      {
        modoEdicion ?
          <h2 className="text-center"><i className="fa fa-edit"></i>&nbsp; Editar Libro</h2> :
          <h2 className="text-center"><i className="fa fa-plus"></i>&nbsp; Agregar Libro</h2>
      }
      <form onSubmit={modoEdicion ? editarLibro : agregarLibro}>
        <div className="row">
          <div className="col-md-3">
            <label>Titulo</label>
            <input type="text" className="form-control" value={titulo} onChange={e => setTitulo(e.target.value)} required></input>
          </div>
          <div className="col-md-3">
            <label>Autor</label>
            <input type="text" className="form-control" value={autor} onChange={e => setAutor(e.target.value)} required></input>
          </div>
          <div className="col-md-3">
            <label>Editorial</label>
            <input type="text" className="form-control" value={editorial} onChange={e => setEditorial(e.target.value)} required></input>
          </div>
          <div className="col-md-3">
            <label>Clasificacion</label>
            <input type="text" className="form-control" value={clasificacion} onChange={e => setClasificacion(e.target.value)} required></input>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <button type="submit" className="btn btn-success mt-2 float-right"><i className="fa fa-save"></i>&nbsp; Aceptar</button>
          </div>
        </div>
      </form>
      <hr />
      <h1 className="text-center"><i className="fa fa-book"></i>&nbsp;Listado de libros</h1>
      <table className="table table-bordered table-sm table-striped">
        <thead>
          <tr className="bg-primary">
            <th className="text-center">Titulo</th>
            <th className="text-center">Autor</th>
            <th className="text-center">Editorial</th>
            <th className="text-center">Clasificacion</th>
            <th className="text-center">Editar</th>
            <th className="text-center">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {
            libros.map(item => (
              <tr key={item.id}>
                <td>{item.titulo}</td>
                <td>{item.autor}</td>
                <td>{item.editorial}</td>
                <td>{item.clasificacion}</td>
                <td className="text-center">
                  {
                    modoEdicion ?
                      <button className="btn btn-secondary btn-sm" onClick={() => activarEdicion(item)}><i class="fa fa-undo"></i></button> :
                      <button className="btn btn-warning btn-sm" onClick={() => activarEdicion(item)}><i class="fa fa-edit"></i></button>
                  }
                </td>
                <td className="text-center">
                  {
                    modoEliminar ?
                      <div>
                        <button className="btn btn-danger btn-sm" onClick={() => eliminarLibro(item.id)}><i class="fa fa-check"></i></button>
                        <button className="btn btn-secondary btn-sm ml-2" onClick={() => activarEliminar(item)}><i class="fa fa-undo"></i></button>
                      </div> :
                      <button className="btn btn-danger btn-sm" onClick={() => activarEliminar(item)}><i class="fa fa-trash"></i></button>
                  }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;