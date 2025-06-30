import React, { useState } from "react";
import { useForm } from "react-hook-form";
import home from "../assets/home.png"
import building from "../assets/building.png"
import house from "../assets/house.png"
import key from "../assets/key.png"
import permanentjob from "../assets/permanent-job.png"
import manager from "../assets/manager.png"
import pdf from "../assets/pdf.png"
import { useNavigate } from "react-router-dom";



export default function PropertyForm() {
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        alert("Form submitted successfully");
    };

    const propertyTypes = [
        {
            label: "Single House Property",
            description: "Single unit house for a single family",
            img: home,
            path: "Single-house",
        },
        {
            label: "Apartments complex",
            description: "Multiple unit house for families",
            img: house,
            path: "Apartments",
        },
        {
            label: "Condominiums",
            description: "Multiple unit house for families",
            img: building,
            path: "Condominiums",
        },
    ];

    const roles = [
        { label: "Landlord", description: "Owner of the property", img: key },
        { label: "Realtor", description: "Manage property on behalf of owner", img: manager },
        { label: "Property management company", description: "For management company", img: permanentjob },
    ];

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[1280px] mx-auto p-6 space-y-6 "
        >
            {/* Property Type  */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Property type</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {propertyTypes.map((type) => (
                        <div
                            key={type.label}
                            onClick={() => navigate(`/add-property/${type.path}`)}
                            className="flex items-center gap-4 cursor-pointer p-4 border rounded-lg hover:border-blue-500 border-gray-300"
                        >
                            <img className="w-6 h-6" src={type.img} alt={type.label} />
                            <div className="ml-3">
                                <p className="font-medium text-lg">{type.label}</p>
                                <p className="text-sm text-gray-400 mt-1.5">{type.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* role  */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Select your role</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {roles.map((r) => (
                        <div
                            key={r.label}
                            onClick={() => setRole(r.label)}
                            className={`flex items-center gap-2 cursor-pointer p-4 border rounded-lg ${role === r.label ? "border-blue-500 bg-blue-50" : "border-gray-300"
                                }`}
                        >
                            <img className="w-6 h-6 mt-1" src={r.img} alt="" />
                            <div className="ml-4">
                                <p className="font-medium text-lg">{r.label}</p>
                                <p className="text-sm text-gray-400 mt-1.5">{r.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {role === "Landlord" && (
                <div>

                    <div className="border border-gray-200 rounded-lg mb-6">
                        <p className="bg-gray-100 text-gray-500 text-sm font-medium px-4 py-2 rounded-lg">
                            Proof of ownership
                        </p>

                        <div className="p-4">
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Ownership doc <span className="text-black">*</span>
                            </label>

                            <div className="relative w-full max-w-sm">
                                <input
                                    type="file"
                                    accept=".pdf"
                                    {...register("ownershipDoc", { required: true })}
                                    className="opacity-0 absolute w-full h-full z-10 cursor-pointer"
                                />

                                <div className="flex items-center justify-center gap-2 w-full border-2 border-dashed  border-gray-200 bg-gray-100 px-4 py-3 rounded-lg text-gray-500 text-sm pointer-events-none">
                                    <img src={pdf} alt="" />
                                    <span> (pdf only)</span>
                                </div>
                            </div>

                            {errors.ownershipDoc && (
                                <p className="text-red-500 text-sm mt-2">Ownership document is required</p>
                            )}
                        </div>
                    </div>

                    {/* checkbox  */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            {...register("terms", { required: true })}
                        />
                        <span>Accept RentYard property adding terms & condition</span>
                    </div>
                    {errors.terms && (
                        <p className="text-red-500 text-sm">You must accept the terms</p>
                    )}
                </div>


            )}


            {role === "Realtor" && (
                <div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg space-y-4">
                        <h3 className=" bg-gray-200 text-gray-500 text-md font-normal  py-2 p-2">Realtor verification</h3>

                        <div className="flex items-center gap-4 justify-evenly p-4">
                            {/* License number  */}
                            <div className="w-full ">
                                <label className="block mb-1 font-medium">License number*</label>
                                <input
                                    type="text"
                                    placeholder="000000000000"
                                    {...register("licenseNumber", { required: true })}
                                    className="w-full border-2 border-gray-200 p-3 rounded-lg hover:border-gray-400"
                                />
                                {errors.licenseNumber && (
                                    <p className="text-red-500 text-sm">License number is required</p>
                                )}
                            </div>

                            {/* Additional Documents for realtor   */}
                            <div className="w-full">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Additional Documents for realtor <span className="text-black"></span>
                                </label>

                                <div className="relative w-full ">
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        {...register("ownershipDoc", { required: true })}
                                        className="opacity-0 absolute w-full h-full z-10 cursor-pointer"
                                    />

                                    <div className="flex items-center justify-center gap-2 w-full border-2 border-dashed  border-gray-200 bg-gray-100 px-4 py-3 rounded-lg text-gray-500 text-sm pointer-events-none">
                                        <img src={pdf} alt="" />
                                        <span> (pdf only)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Agreement with landlord  */}
                            <div className="w-full">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Agreement with landlord<span className="text-black">*</span>
                                </label>

                                <div className="relative w-full ">
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        {...register("agreementDoc", { required: true })}
                                        className="opacity-0 absolute w-full h-full z-10 cursor-pointer"
                                    />

                                    <div className="flex items-center justify-center gap-2 w-full border-2 border-dashed  border-gray-200 bg-gray-100 px-4 py-3 rounded-lg text-gray-500 text-sm pointer-events-none">
                                        <img src={pdf} alt="" />
                                        <span> (pdf only)</span>
                                    </div>
                                </div>
                            </div>



                        </div>
                    </div>

                    {/* checkbox  */}
                    <div className="flex items-center gap-2 mt-4">
                        <input
                            type="checkbox"
                            {...register("terms", { required: true })}
                        />
                        <span>Accept RentYard property adding terms & condition</span>
                    </div>
                    {errors.terms && (
                        <p className="text-red-500 text-sm">You must accept the terms</p>
                    )}

                </div>
            )}


            {role === "Property management company" && (
                <div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg space-y-4">
                        <h3 className=" bg-gray-200 text-gray-500 text-md font-normal  py-2 p-2">Company and office Info</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4 justify-evenly p-4">
                            {/* company name */}
                            <div className="w-full ">
                                <label className="block mb-1 font-medium">Company name*</label>
                                <input
                                    type="text"
                                    placeholder="Runyan trade center"
                                    {...register("companyName", { required: true })}
                                    className="w-full border-2 border-gray-200 p-3 rounded-lg hover:border-gray-400"
                                />
                                {errors.companyName && (
                                    <p className="text-red-500 text-sm">Company name is required</p>
                                )}
                            </div>
                            {/* company Identifier */}
                            <div className="w-full ">
                                <label className="block mb-1 font-medium">Company Identifier(EIN/TIN)*</label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    {...register("companyIdentifier", { required: true })}
                                    className="w-full border-2 border-gray-200 p-3 rounded-lg hover:border-gray-400"
                                />
                                {errors.companyIdentifier && (
                                    <p className="text-red-500 text-sm">Company Identifier is required</p>
                                )}
                            </div>

                            {/* Job Title */}
                            <div className="w-full ">
                                <label className="block mb-1 font-medium">Your Job Title*</label>
                                <input
                                    type="text"
                                    placeholder="Manager"
                                    {...register("jobTitle", { required: true })}
                                    className="w-full border-2 border-gray-200 p-3 rounded-lg hover:border-gray-400"
                                />
                                {errors.jobTitle && (
                                    <p className="text-red-500 text-sm">Company Identifier is required</p>
                                )}
                            </div>

                            {/* Agreement with landlord /owner */}
                            <div className="w-full">
                                <label className="block mb-2  font-medium text-gray-700">
                                    Agreement with landlord/owner<span className="text-black">*</span>
                                </label>

                                <div className="relative w-full ">
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        {...register("agreementDoc", { required: true })}
                                        className="opacity-0 absolute w-full h-full z-10 cursor-pointer"
                                    />

                                    <div className="flex items-center justify-center gap-2 w-full border-2 border-dashed  border-gray-200 bg-gray-100 px-4 py-3 rounded-lg text-gray-500 text-sm pointer-events-none">
                                        <img src={pdf} alt="" />
                                        <span> (pdf only)</span>
                                    </div>
                                </div>
                            </div>

                            {/* country */}
                            <div className="w-full ">
                                <label className="block mb-1 font-medium">Country/ Region*</label>
                                <select
                                    {...register("chooseCountry", { required: true })}
                                    className="w-full border-2 border-gray-200 p-3 rounded-lg hover:border-gray-400 text-gray-600"
                                    defaultValue=""
                                >
                                    <option value="" disabled>Choose country</option>
                                    <option value="Bangladesh">Bangladesh</option>
                                    <option value="United States">United States</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                    <option value="India">India</option>
                                    <option value="Canada">Canada</option>
                                    {/* Add more as needed */}
                                </select>

                                {errors.chooseCountry && (
                                    <p className="text-red-500 text-sm mt-1">Country is required</p>
                                )}
                            </div>
                            {/* street address  */}
                            <div className="w-full ">
                                <label className="block mb-1 font-medium">Street Address*</label>
                                <input
                                    type="text"
                                    placeholder="111 Austin Ave"
                                    {...register("streetAddress", { required: true })}
                                    className="w-full border-2 border-gray-200 p-3 rounded-lg hover:border-gray-400"
                                />
                                {errors.streetAddress && (
                                    <p className="text-red-500 text-sm">street Address is required</p>
                                )}
                            </div>
                            {/* apt, suit, unit  */}
                            <div className="w-full ">
                                <label className="block mb-1 font-medium">apt, suit, unit(if applicable)</label>
                                <input
                                    type="text"
                                    placeholder="3050"
                                    {...register("apt", { required: true })}
                                    className="w-full border-2 border-gray-200 p-3 rounded-lg hover:border-gray-400"
                                />
                                {errors.streetAddress && (
                                    <p className="text-red-500 text-sm">Apt is required</p>
                                )}
                            </div>

                            {/* Phone Number */}
                            <div className="w-full">
                                <label className="block text-sm font-medium mb-1">Phone number* </label>
                                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">

                                    {/* Country code dropdown - you can replace this with an actual flag dropdown component */}
                                    <div className="flex items-center px-3 border-r border-gray-300 bg-gray-100">
                                        <img
                                            src="https://flagcdn.com/w40/bd.png" // Bangladesh flag 
                                            alt="Country flag"
                                            className="w-5 h-4 object-cover rounded-sm"
                                        />
                                        <svg
                                            className="w-3 h-3 ml-1 text-gray-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>

                                    {/* Phone number input */}
                                    <input
                                        type="tel"
                                        placeholder="+880"
                                        {...register("phoneNumber", { required: true })}
                                        className="w-full px-3 py-2 text-sm outline-none"
                                    />
                                </div>

                                {errors.phoneNumber && (
                                    <p className="text-red-500 text-sm mt-1">Phone number is required</p>
                                )}
                            </div>


                            {/* Contact email  */}
                            <div className="w-full ">
                                <label className="block mb-1 font-medium">Contact email *</label>
                                <input
                                    type="email"
                                    placeholder="majarul2025@gmail.com"
                                    {...register("email", { required: true })}
                                    className="w-full border-2 border-gray-200 p-3 rounded-lg hover:border-gray-400"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">Contact email  is required</p>
                                )}
                            </div>

                            {/* City/Town  */}
                            <div className="w-full ">
                                <label className="block mb-1 font-medium">City/Town*</label>
                                <input
                                    type="text"
                                    placeholder="Dallas"
                                    {...register("cityTown ", { required: true })}
                                    className="w-full border-2 border-gray-200 p-3 rounded-lg hover:border-gray-400"
                                />
                                {errors.cityTown && (
                                    <p className="text-red-500 text-sm">City/Town email  is required</p>
                                )}
                            </div>

                            {/* State/Territory  */}
                            <div className="w-full ">
                                <label className="block mb-1 font-medium">State/Territory*</label>
                                <select
                                    {...register("stateTerritory", { required: true })}
                                    className="w-full border-2 border-gray-200 p-3 rounded-lg hover:border-gray-400 text-gray-600"
                                    defaultValue=""
                                >
                                    <option value="" disabled>Choose State/Territory</option>
                                    <option value="TX">Texas</option>
                                    <option value="CA">California</option>
                                    <option value="NY">New York</option>
                                    <option value="FL">Florida</option>
                                    <option value="IL">Illinois</option>
                                    <option value="GA">Georgia</option>
                                    <option value="PA">Pennsylvania</option>
                                    <option value="OH">Ohio</option>
                                    {/* Add more as needed */}
                                </select>
                                {errors.stateTerritory && (
                                    <p className="text-red-500 text-sm">stateTerritory email  is required</p>
                                )}
                            </div>

                            {/* zipCode */}
                            <div className="w-full ">
                                <label className="block mb-1 font-medium">Zip Code*</label>
                                <input
                                    type="number"
                                    placeholder="75061"
                                    {...register("zipCode ", { required: true })}
                                    className="w-full border-2 border-gray-200 p-3 rounded-lg hover:border-gray-400"
                                />
                                {errors.zipCode && (
                                    <p className="text-red-500 text-sm">zipCode  is required</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* checkbox  */}
                    <div className="flex items-center gap-2 mt-4">
                        <input
                            type="checkbox"
                            {...register("terms", { required: true })}
                        />
                        <span>Accept RentYard property adding terms & condition</span>
                    </div>
                    {errors.terms && (
                        <p className="text-red-500 text-sm">You must accept the terms</p>
                    )}

                </div>
            )}



           {/* footer Buttons */}
      <div className=" mt-65  items-center  w-[1280px] bg-white px-10 p-4 flex justify-between mx-auto ">
        <button
          type="button"
          onClick={() => navigate(`/`)}
          className="text-blue-500 font-semibold cursor-pointer hover:border hover:bg-gray-50  px-3 py-2 rounded-md"
        >
          Back
        </button>
        <button
          type="submit"
          onClick={() => navigate(`/profile`)}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md cursor-pointer"
        >
          Get Started
        </button>
      </div>
        </form>
    );
}