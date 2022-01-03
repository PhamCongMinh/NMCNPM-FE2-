import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";

import CreateForm from "../../Homestay/CreateHomestay/CreateForm.js";

function UpdateModal (props){
    const [isOpen, setIsOpen] = props.openProp;
    const _id=props._id
    const closeModal = () => setIsOpen(false);

    const [infor, setInfor] = useState({})

    const [generalServices, setGeneralServices] = useState([])
    const [services, setServices] = useState([])
    const [amenities, setAmenities] = useState([])

    useEffect(() => {
        const fetchData = async() => {
            try {
                const {data: response} = await axios.get(`http://localhost:8000/homestays/information/${_id}`);
                setInfor(response.content.homestay)
                console.log(response.content.homestay)
            } 
            catch (error) {
                console.error(error.message);
              }
        }
        fetchData()
      }, [])

    const createSubmit = (e) =>{
        e.preventDefault();
        if (infor.name === "") {
            toast.error("Chưa điền Tên homestay");
          } else if (infor.province === "") {
            toast.error("Chưa điền Tỉnh/ Thành phố");
          } else 
          try {
            axios.put('http://localhost:8000/homestays/update', {
                _id: _id,
                name: infor.name,
                province: infor.province,
                district: infor.district,
                address: infor.address,
                type: infor.type,
                area: infor.area,
                price: infor.price,
                description: infor.description,
                adminId: infor.adminId,
                amenities: amenities,
                generalServices: generalServices,
                services: services
            })
            toast.success("Cập nhật thông tin Homestay thành công")
            setIsOpen(false)
            setAmenities([])
            setGeneralServices([])
            setServices([])
            setInfor({
                name: "" ,
                province: "",
                district : "",
                address : "",
                type: "",
                area: "",
                description: "",
                price : 0,
                adminId:""
            }, null)
            } catch (err) {
                console.log(err.message)
            }    
    }
    return (
        <div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto backdrop-filter backdrop-brightness-50"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                        <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                        &#8203;
                        </span>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                        <div className="
                            inline-block w-11/12 p-6 my-8 overflow-hidden text-left 
                            align-middle transition-all transform bg-white shadow-xl rounded-2xl"
                            >
                            <div className="relative">
                                <Dialog.Title
                                    as="h3"
                                    className="text-xl font-bold leading-6 text-gray-900 text-center"
                                >
                                    Tạo Homestay mới
                                </Dialog.Title>
                                <button
                                    className="absolute top-0 right-0 rounded-full transition ease-in-out duration-400 hover:bg-gray-200"
                                    onClick={closeModal}
                                >
                                    <XIcon className="w-6 h-6" />
                                </button>
                            </div>
                            
                            <div className="my-4 border-t border-b max-h-xl overflow-x-hidden">
                                <div class="h-4 mt-3 text-gray-500 text-xs leading-8 text-right">
                                    <span class="text-red-400 mr-1">*</span> 
                                    Các trường bắt buộc phải điền
                                </div>
                                <CreateForm 
                                    inforProps={[infor, setInfor]}
                                    amenityProps={[amenities, setAmenities]}
                                    generalProps={[generalServices, setGeneralServices]}
                                    serviceProps={[services, setServices]}
                                />
                            </div>

                            <div className="text-center">
                                <button 
                                    className="
                                        inline-flex justify-center px-4 py-2 text-md font-medium shadow-md 
                                        text-white bg-green-600 border border-transparent rounded-md 
                                        focus:cursor-pointer hover:bg-green-700 text-lg text-center"
                                    onClick={(e) => {
                                        createSubmit(e);
                                        }}
                                    >
                                Xác nhận
                                </button>
                            </div>
                        </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

export default UpdateModal;
