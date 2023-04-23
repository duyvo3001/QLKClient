import Request from "../../../../api/Request"
export const HandleDelete = (ID, PostUrl, RequestRenderTable, filters, setData, url) => {

    Request
        .post(`/${PostUrl}/${ID}`, {},
            {
                headers: { Authorization: sessionStorage.getItem("access_token") }
            })
        .then(Response => {
            RequestRenderTable(filters, setData, url)
        }
        )
        .catch(eror => { console.error(eror) })
}