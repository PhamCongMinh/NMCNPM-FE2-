import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from 'react-redux'

function InformationForm(props){
    const [homestay, setHomestay] = props.inforProps;
    const [admin, setAdmin] = useState([])

    const handleInput = (e) => {
        const newHomestay = {...homestay}
        newHomestay[e.target.name] = e.target.value 
        setHomestay(newHomestay)
        console.log(newHomestay)
    };
    const { token } = useSelector((state) => state.authReducer);

    useEffect(() => {
        const fetchData = async() => {
        try {
                const {data: response} = await axios.get('http://localhost:8000/super-admins/get/admins', {
                    headers:{
                        Authorization: "Bearer " + token,
                    }
                });
                setAdmin(response.content)
                console.log(response.content)
            } 
        catch (error) {
            console.error(error.message);
            }
        }
        fetchData()
      }, [])

      return (
        <div>
            <label htmlFor="name" className="flex flex-col p-2">
                <div class="font-bold h-6 text-gray-600 text-sm leading-8 uppercase">
                    <span class="text-red-400 mr-1">*</span> 
                    Tên homestay
                </div>
                <input
                    required
                    className="border px-4 py-2 rounded-md focus:outline-none"
                    id="name"
                    type="text"
                    name="name"
                    value={homestay.name}
                    onChange = {(e) => handleInput (e)}
                />
            </label>

            <label htmlFor="adminId" className="flex flex-col p-2">
                <div class="font-bold h-6 mt-3 text-gray-600 text-sm leading-8 uppercase">
                    Admin
                </div>
                <select 
                    name = "adminId"
                    value={homestay.adminId} 
                    onChange={(e) => handleInput (e)}
                    className="border rounded-md px-4 py-2"
                >
                    <option className="text-gray-300"> -- null -- </option>
                    {admin && admin.length ? admin.map(admin=>
                        <option value={admin._id}> {admin.name} </option> 
                        
                    ):null}
                </select>
            </label>

            <label htmlFor="province" className="flex flex-col p-2">
                <div class="font-bold h-6 mt-3 text-gray-600 text-sm leading-8 uppercase">
                    <span class="text-red-400 mr-1">*</span> 
                    Tỉnh/ Thành phố
                </div>
                <input
                    required
                    className="border px-4 py-2 rounded-md focus:outline-none"
                    id="province"
                    type="text"
                    name="province"
                    list="provinceList"
                    value={homestay.province}
                    onChange = {(e) => handleInput (e)}
                />
                <datalist id="provinceList">
                    <option value="Hà Nội"/>
                    <option value="Đà Nẵng"/>
                    <option value="Khánh Hòa"/>
                    <option value="Lâm Đồng"/>
                    <option value="Nha Trang"/>
                    <option value="Quảng Nam"/>
                    <option value="Bà Rịa Vũng Tàu"/>
                </datalist>
            </label>

            <label htmlFor="district" className="flex flex-col p-2">
                <div class="font-bold h-6 mt-3 text-gray-600 text-sm leading-8 uppercase">
                    Quận/ huyện
                </div>
                <input
                    className="border px-4 py-2 rounded-md focus:outline-none"
                    id="district"
                    type="text"
                    name="district"
                    value={homestay.district}
                    onChange = {(e) => handleInput (e)}
                />
            </label>

            <label htmlFor="address" className="flex flex-col p-2">
                <div class="font-bold h-6 mt-3 text-gray-600 text-sm leading-8 uppercase">
                    Địa chỉ
                </div>
                <input
                    className="border px-4 py-2 rounded-md focus:outline-none"
                    id="address"
                    type="text"
                    name="address"
                    value={homestay.address}
                    onChange = {(e) => handleInput (e)}
                />
            </label>

            <label htmlFor="type" className="flex flex-col p-2">
                <div class="font-bold h-6 mt-3 text-gray-600 text-sm leading-8 uppercase">
                    Loại homestay
                </div>
                <input
                    className="border px-4 py-2 rounded-md focus:outline-none"
                    id="type"
                    type="text"
                    name="type"
                    value={homestay.type}
                    onChange = {(e) => handleInput (e)}
                />
            </label>

            <label htmlFor="area" className="flex flex-col p-2">
                <div class="font-bold h-6 mt-3 text-gray-600 text-sm leading-8 uppercase">
                    Diện tích
                </div>                
                <input
                    className="border px-4 py-2 rounded-md focus:outline-none"
                    id="area"
                    type="text"
                    name="area"
                    pattern="[0-9]*"
                    value={homestay.area}
                    onChange = {(e) => handleInput (e)}
                />
            </label>

            <label htmlFor="price" className="flex flex-col p-2">
                <div class="font-bold h-6 mt-3 text-gray-600 text-sm leading-8 uppercase">
                    Giá tiền
                </div>                
                <input
                    className="border px-4 py-2 rounded-md focus:outline-none"
                    id="price"
                    type="text"
                    name="price"
                    pattern="[0-9]*"
                    value={homestay.price}
                    onChange = {(e) => handleInput (e)}
                />
            </label>

            <label htmlFor="description" className="flex flex-col p-2">
                <div class="font-bold h-6 mt-3 text-gray-600 text-sm leading-8 uppercase">
                    Mô tả
                </div>
                <input
                    className="border px-4 py-2 rounded-md focus:outline-none"
                    id="description"
                    type="text"
                    name="description"
                    value={homestay.description}
                    onChange = {(e) => handleInput (e)}
                />
            </label>

        </div>
    )
}
export default InformationForm;
