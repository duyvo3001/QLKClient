import React, { useState } from 'react'
import Request from '../../api/Request';
import { useParams } from 'react-router-dom';

const DetailProduct = () => {
  const [Data,setData] = useState(null)
  const params = useParams()
  const MaLK = params.id;
  RequestRouterSearch("SearchDetailProduct",MaLK,setData)
  console.log(Data)
  return (
    <div>{Data}</div>
  )
}
function RequestRouterSearch(Url, MaLK, SetData) {
  Request
    .get(`/${Url}/${MaLK}`,
      { headers: { Authorization: sessionStorage.getItem("access_token") } })
    .then((response) => {
      SetData(response)
    })
    .catch((error) => { console.log(error) })
}
export default DetailProduct