import {cuteToast}  from './alerts/cute-alert.js'

type MemberType = {
    member_id: string,
    full_name: string,
    dob: Date,
    gender: string,
    membership_type: string,
    joining_date: Date,
    contact_number: number,
    email: string,
    address: string,
    emg_contact_number: string,
    medical_condition: string
};
let members:MemberType[] = []
const addForm:any = document.getElementById("member_form") as HTMLFormElement | null
const member_id_validation:any = document.getElementById("member_id_validation") as HTMLElement | null
const tbody:any = document.getElementById("tbody") as HTMLElement | null
const searchbar:any = document.getElementById("searchbar") as HTMLElement | null
const table:any = document.getElementById('table');
const title:any = document.getElementById('model_title') as HTMLElement | null
const deleteTitle:any = document.getElementById('delete_model_title') as HTMLElement | null
const submit_btn:any = document.getElementById("submit_button") as HTMLElement | null;
const add_btn:any = document.getElementById("add_member") as HTMLElement | null;
const delete_btn:any = document.getElementById("delete_member") as HTMLElement | null;
const deleteMemberConfirm:any = document.getElementById("deleteMemberConfirm") as HTMLElement | null;
let selectedMember:any = null

delete_btn.addEventListener('click', ()=>{
    members.forEach((res:MemberType)=>{
        if(res.member_id === selectedMember){
            deleteTitle.innerHTML = "Delete " + res.full_name;
            $("#exampleModal").modal('hide')
            $("#deleteModal").modal('show')
        }
    })
})

deleteMemberConfirm.addEventListener('click', ()=>{
    members = members.filter((res:MemberType)=>{
        return res.member_id !== selectedMember
    })
    cuteToast({
        type: "success",
        message: selectedMember + " delete successfully",
        timer: 5000
    })
    $("#deleteModal").modal('hide')
    showMembers()
})

add_btn.addEventListener('click', ()=>{
    selectedMember = null
    addForm.elements['member_id'].value = ''
    addForm.elements['full_name'].value = ''
    addForm.elements['dob'].value = ''
    addForm.elements['gender'].value = 'Unspecified'
    addForm.elements['membership_type'].value = 'Basic'
    addForm.elements['joining_date'].value = ''
    addForm.elements['contact_number'].value = ''
    addForm.elements['email'].value = ''
    addForm.elements['address'].value = ''
    addForm.elements['emg_contact_number'].value = ''
    addForm.elements['medical_condition'].value = ''
    member_id_validation.style.color = 'gray'
    delete_btn.style.display = 'none'
    title.innerHTML = 'Add Member'
    submit_btn.innerText = "New Member"
    const memberID:any = document.getElementById("member_id")
    memberID.disabled = false;
    $("#exampleModal").modal('show')
})

table.addEventListener('click', function(event:any) {
    let rowId = event.target.parentNode.id;
    if(rowId !== ''){
        rowId = parseInt(rowId)
        const member:any = members[rowId]
        for (const property in member) {
            const element:any = document.getElementById(property) as HTMLElement | null
            element.value = member[property];
        }
        member_id_validation.style.color = 'gray'
        const memberID:any = document.getElementById("member_id")
        memberID.disabled = true;
        selectedMember = members[rowId].member_id
        delete_btn.style.display = ''
        title.innerHTML = 'Edit ' + members[rowId].full_name
        submit_btn.innerText = "Edit Member"
        $("#exampleModal").modal('show')
    }
});

const showMembers = () =>{
    tbody.innerHTML = ''
    if(members.length > 0){
        members.forEach((res:MemberType, index:number)=>{
            let joiningDateFormate:any = res.joining_date
            joiningDateFormate = joiningDateFormate.replaceAll('-', '/')
            const row = document.createElement("tr");
            const id = document.createElement("td");
            const name = document.createElement("td");
            const gender = document.createElement("td");
            const type = document.createElement("td");
            const date:any = document.createElement("td");
            id.innerHTML = res.member_id;
            name.innerHTML = res.full_name;
            gender.innerHTML = res.gender;
            type.innerHTML = res.membership_type;
            date.innerHTML = joiningDateFormate;
            row.setAttribute('id', index.toString())
            row.appendChild(id);
            row.appendChild(name);
            row.appendChild(gender);
            row.appendChild(type);
            row.appendChild(date);
            tbody.appendChild(row)
        })
    }else{
        const row = document.createElement("tr");
        const td:any = document.createElement("td");
        td.innerHTML = 'No Member Found';
        td.colSpan = '5';
        td.classList.add("no_data")
        row.appendChild(td);
        tbody.appendChild(row)
    }
}
showMembers()

addForm?.addEventListener("submit", (e:any) =>{
    e.preventDefault()
    let validation = true
    if(selectedMember === null){
        members.forEach((res:MemberType)=>{
            if(res.member_id === addForm.elements['member_id'].value){
                validation = false
                member_id_validation.style.color = 'red'
                cuteToast({
                    type: "error",
                    message: "Member Id must be unique",
                    timer: 5000
                })
            }
        })
    }

    if(validation){
        member_id_validation.style.color = 'gray'
        if(selectedMember !== null){
            members.forEach((res:MemberType)=>{
                if(res.member_id === selectedMember){
                    res.full_name = addForm.elements['full_name'].value,
                    res.dob = addForm.elements['dob'].value,
                    res.gender = addForm.elements['gender'].value,
                    res.membership_type = addForm.elements['membership_type'].value,
                    res.joining_date = addForm.elements['joining_date'].value,
                    res.contact_number = addForm.elements['contact_number'].value,
                    res.email = addForm.elements['email'].value,
                    res.address = addForm.elements['address'].value,
                    res.emg_contact_number = addForm.elements['emg_contact_number'].value,
                    res.medical_condition = addForm.elements['medical_condition'].value
                }
            })
            cuteToast({
                type: "success",
                message: addForm.elements['full_name'].value + " update successfully",
                timer: 5000
            })
            $("#exampleModal").modal('hide')
        }else{
            if(addForm.elements['member_id'].value === ''){
                member_id_validation.style.color = 'red'
                cuteToast({
                    type: "error",
                    message: "Member Id is required",
                    timer: 5000
                })
            }else{
                members.push({
                    member_id: addForm.elements['member_id'].value,
                    full_name: addForm.elements['full_name'].value,
                    dob: addForm.elements['dob'].value,
                    gender: addForm.elements['gender'].value,
                    membership_type: addForm.elements['membership_type'].value,
                    joining_date: addForm.elements['joining_date'].value,
                    contact_number: addForm.elements['contact_number'].value,
                    email: addForm.elements['email'].value,
                    address: addForm.elements['address'].value,
                    emg_contact_number: addForm.elements['emg_contact_number'].value,
                    medical_condition: addForm.elements['medical_condition'].value
                })
                cuteToast({
                    type: "success",
                    message: "New member add successfully",
                    timer: 5000
                })
                members.reverse()
                $("#exampleModal").modal('hide')
            }    
        } 
        showMembers()
    }
})

searchbar?.addEventListener('input', (e:any)=>{
    const value = e.target.value
    if(value !== ''){
        const data =  members.filter((e:MemberType)=>{
            return e.member_id.toLowerCase().indexOf(value.toLowerCase()) > -1 
        })
        tbody.innerHTML = ''
    if(data.length > 0){
        data.forEach((res:MemberType, index:number)=>{
            let joiningDateFormate:any = res.joining_date
            joiningDateFormate = joiningDateFormate.replaceAll('-', '/')
            const row = document.createElement("tr");
            const id = document.createElement("td");
            const name = document.createElement("td");
            const gender = document.createElement("td");
            const type = document.createElement("td");
            const date:any = document.createElement("td");
            id.innerHTML = res.member_id;
            name.innerHTML = res.full_name;
            gender.innerHTML = res.gender;
            type.innerHTML = res.membership_type;
            date.innerHTML = joiningDateFormate;
            row.setAttribute('id', index.toString())
            row.appendChild(id);
            row.appendChild(name);
            row.appendChild(gender);
            row.appendChild(type);
            row.appendChild(date);
            tbody.appendChild(row)
        })
    }else{
        const row = document.createElement("tr");
        const td:any = document.createElement("td");
        td.innerHTML = 'No Member Found';
        td.colSpan = '5';
        td.classList.add("no_data")
        row.appendChild(td);
        tbody.appendChild(row)
    }
    }else{
        showMembers()
    } 
})