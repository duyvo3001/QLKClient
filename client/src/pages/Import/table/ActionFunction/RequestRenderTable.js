import Request from "../../../../api/Request";

export const RequestRenderTable = (filters, setData, url) => {

    Request.get(`/${url}/${filters?.page}`, {
        headers: { 'Authorization': sessionStorage.getItem("access_token") }
    })
        .then(response => {
            setData(response)
        })
        .catch(function (error) {
            console.log(error);
        });
}