export const HandleEdit = (_id,setIdItem) => {
    const nameTextArea = document.getElementsByClassName(_id)// dang true
    const divText = document.getElementsByClassName(_id + "hidden")//dang false

    setIdItem(_id)
    for (let i = 0; i < nameTextArea.length; i++) {
        nameTextArea[i].hidden = true;
    }

    for (let i = 0; i < divText.length; i++) {
        divText[i].hidden = false;
    }
}