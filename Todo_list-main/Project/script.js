const Add_Button = document.querySelector("#Tambahkan")
const Ambil_Todo_dari_user = document.querySelector("#Tugas")
const isi_todo = document.querySelector(".isi_todo")
const Delete_all = document.querySelector(".Delete_all")
const searching = document.querySelector(".searching_list")

//Menambahkan addButton
Add_Button.addEventListener("click", (e) => {
    e.preventDefault()
    //Membuat element li
    if(!Ambil_Todo_dari_user.value){
        alert("Tidak boleh kosong!")
        return
    }
    const newTodo = document.createElement("li")
    newTodo.textContent = Ambil_Todo_dari_user.value

    //Membuat class Div
    const CreateClass = document.createElement("div")
    CreateClass.className = "edit"

    //EDIT BUTTON
    const Modify = document.createElement("a")
    Modify.href = "#"
    Modify.className = "Modify"

    //Membuat gambarnya edit
    const IMG_EDIT = document.createElement("img")
    IMG_EDIT.src ="contract_edit_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"

    //Trash Button
    const Trash = document.createElement("a")
    Trash.href = "#"
    Trash.className = "Delete"
    // Trash.parentNode.p

    //img trash
    const IMG_TRASH = document.createElement("img")
    IMG_TRASH.src = "delete_forever_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png"

    //Naro Gambar ke a trash
    Trash.appendChild(IMG_TRASH)
    //Naro Gambar ke a edit
    Modify.appendChild(IMG_EDIT)
    //Taro A ke div
    CreateClass.appendChild(Modify);
    CreateClass.appendChild(Trash);

    newTodo.appendChild(CreateClass)

    isi_todo.appendChild(newTodo)
    
    Ambil_Todo_dari_user.value = ""
})

//Menghapus button

isi_todo.addEventListener("click", (e) => {
    e.preventDefault()
    const target_yang_dituju = e.target.closest(".Delete")
    if(target_yang_dituju){
        if(!confirm("Apakah anda ingin menghapusnya?")){
            console.log("Tidak jadi")
            return
        }
        //Cara kerjanya
        //.Delete diatasnya ada edit. lalu edit diatasnya ada li target
        // cara pertama
        // target_yang_dituju.parentNode.parentNode.remove()
        //Cara kedua
        const li = target_yang_dituju.closest("li")
        li.remove()
    }
})

//Mengedit button
isi_todo.addEventListener("click", (e) => {
    e.preventDefault()
    const target_yang_dituju = e.target.closest(".Modify") //ambil daerah modify
    //cara AI
    // const li = target_yang_dituju.closest("li");
    // const text_sementara = Array.from(li.childNodes).find(node => node.nodeType === Node.TEXT_NODE) 
    //NodeType akan menghasilkan Teks biasa
    //cara manual
    const text_sementara = e.target.closest("li").textContent.trim() //ngebackup isi text jika cancel
    const input = document.createElement("input")
    const cancel = "contract_edit_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"

    // Cek apakah sudah ada input yang sedang aktif di dalam list
//     const input_Yang_Sudah_Ada = isi_todo.querySelector("input[type='text']");
//     if (input_Yang_Sudah_Ada) {
//         const li = input_Yang_Sudah_Ada.closest("li");
//         const image = li.querySelector(".Modify img");
//         li.insertBefore(document.createTextNode(input_Yang_Sudah_Ada.value), input_Yang_Sudah_Ada);
//         input_Yang_Sudah_Ada.remove();
//         if (image) {
//             image.src = "contract_edit_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"; // balikin icon edit
//     }
//     //jika tidak ada
// }
    if(target_yang_dituju){ //jika di pencet tombol modify
        if(!confirm("Apakah anda ingin mengeditnya?")){
            return
        }
        const Kepala_li = target_yang_dituju.parentNode.parentNode
        input.type = "text"
        input.value = text_sementara //nyimpan teks yang dari yang sebelumnya

        //Menghapus kata lama agar bisa dimasukan teks input
        target_yang_dituju.closest("li").firstChild.remove()

        //memasukan inputan button ditempat bekas todo-user
        target_yang_dituju.closest("li").insertBefore(input, target_yang_dituju.parentNode)
        //ini jatuhnya kerena teks nya ga ada, otomatis kepalanya sih div edit.
        const AppiedNewImage = target_yang_dituju.lastChild
        AppiedNewImage.src = "check_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"

        //Menangkap capture keyboard
        Kepala_li.addEventListener("keyup", (event) => {
            //Menggunakan keyboard
            if(event.key === "Enter"){
                const text_baru = input.value.trim()
                if(text_baru){
                    const li = Kepala_li
                    li.insertBefore(document.createTextNode(text_baru), input)
                    input.remove()
                    AppiedNewImage.src = cancel
                    console.info(li)
                }
            }
            else if(event.key === "Escape"){
                const li = Kepala_li
                li.insertBefore(document.createTextNode(text_sementara), input)
                AppiedNewImage.src = cancel
                input.remove()
                console.info("Bisa")
            }
    
        })
        //Menangkap capture Mouse
        Kepala_li.addEventListener("click", (event) => {
            const btnModify = event.target.closest(".Modify");
            if(btnModify){
                event.stopImmediatePropagation()
                const text_baru = input.value.trim()
                if(text_baru){
                    const li = Kepala_li
                    li.insertBefore(document.createTextNode(text_baru), input)
                    input.remove()
                    AppiedNewImage.src = cancel
                    console.info(li)
                }
            }
            console.info(event)
        }, {once:true})
    console.info("Bagian event target_yang_dituju")
    }
    console.info("Function isi_todo")
}) //memeriksa hanya 1 kali tombol yg ditekan

//clear button
Delete_all.addEventListener("click", (e) => {
    if(confirm("Apakah anda yakin ingin menghapusnya?")){
        isi_todo.innerHTML = ""
    }
})


searching.addEventListener("keyup", (e) => {
    e.preventDefault()
    const data_todo = document.querySelectorAll("li")
    const text_event = e.target.value.toLowerCase()

    data_todo.forEach((barang, index) => {
        const text_isi = barang.textContent.toLowerCase()
        if(text_isi.indexOf(text_event) === -1){
            console.log("Data tidak di temukan")
            data_todo[index].setAttribute("style", "display: none !important;")
            console.log(data_todo[index])
        }
        else{
            console.log("Ditemukan")
            data_todo[index].setAttribute("style", "display: flex;")
        }
    })
})