import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

const ProfilePage = () => {
    const { authUser, updateProfile } = useContext(AuthContext)
    const [selectedImg, setSelectedImg] = useState(null);
    const navigate = useNavigate();
    const [name, setName] = useState(authUser.fullName);
    const [bio, setBio] = useState(authUser.bio);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedImg) {
            await updateProfile({ fullName: name, bio });
            navigate('/');
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(selectedImg);
        reader.onload = async () => {
            const base64Image = reader.result;
            await updateProfile({ profilePic: base64Image, fullName: name, bio });
            navigate('/');
        };

    };

    return (
        <div className='min-h-screen bg-[#1f1f2b] flex items-center justify-center text-white'>
            <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg overflow-hidden'>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-10 flex-1 w-full">
                    <h3 className="text-xl font-semibold text-white">Profile Details</h3>

                    {/* Upload Profile Image */}
                    <label htmlFor="avatar" className="flex items-center gap-3 cursor-pointer">
                        <input
                            onChange={(e) => setSelectedImg(e.target.files[0])}
                            type="file"
                            id='avatar'
                            accept='.png, .jpg, .jpeg'
                            hidden
                        />
                        <img
                            src={selectedImg ? URL.createObjectURL(selectedImg) : authUser?.profilePic || assets.logo_icon}
                            alt=""
                            className={`w-12 h-12 ${selectedImg && 'rounded-full'}`}
                        />
                        <span>Upload Profile Image</span>
                    </label>

                    {/* Name Input */}
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                        className="bg-transparent border-b border-gray-400 py-1 px-2 text-white outline-none"
                    />

                    {/* Bio Input */}
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Enter a short bio..."
                        className="bg-transparent border-b border-gray-400 py-1 px-2 text-white outline-none resize-none"
                        rows={3}
                    />

                    {/* Save Button */}
                    <button
                        type="submit"
                        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-all w-fit"
                    >
                        Save Profile
                    </button>
                </form>
                <img className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 ${selectedImg && 'rounded-full'}`} src={authUser?.profilePic || assets.logo_icon} alt="" />

            </div>
        </div>
    );
};

export default ProfilePage;