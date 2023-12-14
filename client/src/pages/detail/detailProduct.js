import React, { useState } from 'react'
import Request from '../../api/Request';
import { useParams } from 'react-router-dom';

const DetailProduct = () => {
  const [Data,setData] = useState(null)
  const params = useParams()
  const MaLK = params.id;

  RequestRouterSearch("SearchDetailProduct",MaLK,setData)

  function RequestRouterSearch(Url, MaLK, setData) {
    Request
      .get(`/${Url}/${MaLK}`,
        { headers: { Authorization: sessionStorage.getItem("access_token") } })
      .then((response) => {
        setData(response.data.result[0])
      })
      .catch((error) => { console.log(error) })
  }
  // console.log(Data)
  return (
    <div>{}</div>
  )
}

export default DetailProduct