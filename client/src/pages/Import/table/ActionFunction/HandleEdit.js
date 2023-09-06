export const HandleEdit = (_id, setIdItem) => {
    const divText = document.getElementsByClassName(_id + "hidden")//dang false
    const nameTextArea = document.getElementsByClassName(_id)// dang true
    setIdItem(_id)
    console.log(divText[0])
    console.log(divText[1])
    console.log(divText[2])
    console.log(divText[3])
    for (let i = 0; i < nameTextArea.length; i++) {
        // console.log(nameTextArea[i])
        nameTextArea[i].hidden = true;
    }

    for (let i = 0; i < divText.length; i++) {
        // console.log(divText)
        divText[i].hidden = false;
    }
}