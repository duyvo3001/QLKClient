import Request from "../../../../api/Request";
class serviceUrl {
    constructor(postUrl = '/editBrand', homeUrl = 'HomeBrand') {
        this.postUrl = postUrl
        this.homeUrl = homeUrl
    }

    static getTransport = (UrlLink) => {
        // eslint-disable-next-line default-case
        switch (UrlLink) {
            case "Brand":
                return new serviceUrl()
            case "Stock":
                return new serviceUrl('/editStock', 'ImportStock')
            case "Supplier":
                return new serviceUrl('/editSupplier', "HomeSupplier")
            case "Customer":
                return new serviceUrl('/UpdateCustomer', "CustomerPage")
            case "User":
                return new serviceUrl('/updateUser', "StaffPage")
            case "Category":
                return new serviceUrl('/updateCategory', "CategoryPage")
        }
    }
}
const UpdateEdit = (_id, formData, setIdItem, CancelEdit, RequestRenderTable, filters, setData, UrlLink) => {

    const KindServiceUrl = serviceUrl.getTransport(UrlLink);
    Request
        .patch(
            KindServiceUrl.postUrl,
            { formData },
            { headers: { Authorization: sessionStorage.getItem("access_token") } }
        )
        .then(response => {
            if (response?.status === 200) {
                setIdItem(_id)
                CancelEdit(_id, setIdItem)
                RequestRenderTable(filters, setData, KindServiceUrl.homeUrl)
            }
            else {
                CancelEdit(_id)
                RequestRenderTable(filters, setData, KindServiceUrl.homeUrl)
            }
        })
        .catch((error) => {
            console.error(error);
        });
}
const UpdateEditUser = (_id, formData, AccessRight, setIdItem, CancelEdit, RequestRenderTable, filters, setData, UrlLink) => {

    const KindServiceUrl = serviceUrl.getTransport(UrlLink);
    Request
        .patch(
            KindServiceUrl.postUrl,
            { formData, AccessRight },
            { headers: { Authorization: sessionStorage.getItem("access_token") } }
        )
        .then(response => {
            if (response?.status === 200) {
                setIdItem(_id)
                CancelEdit(_id, setIdItem)
                RequestRenderTable(filters, setData, KindServiceUrl.homeUrl)
            }
            else {
                CancelEdit(_id)
                RequestRenderTable(filters, setData, KindServiceUrl.homeUrl)
            }
        })
        .catch((error) => {
            console.error(error);
        });
}
export { UpdateEdit, UpdateEditUser }