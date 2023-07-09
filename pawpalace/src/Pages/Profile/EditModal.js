import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	ModalCloseButton,
	useToast,
	ModalHeader,
} from "@chakra-ui/react";
import { BsImageFill } from "react-icons/bs";
import { avatarArr, backgroundArr, handleUserEdit } from "../../Utils/api";

const EditModal = ({
	formData,
	setFormData,
	openEditModal,
	setOpenEditModal,
	currUser,
}) => {
	const dispatch = useDispatch();
	const toast = useToast();
	const { encodedToken } = useSelector((store) => store.user);

	function handleFormOnChange(e) {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	function handleFormSubmit(e) {
		e.preventDefault();
		if (formData.website) {
			if (formData.website?.includes("http")) {
				const userData = {
					...currUser,
					...formData,
				};
				handleUserEdit(userData, encodedToken, dispatch, toast);
				setOpenEditModal(false);
			} else {
				alert("not a valid url");
			}
		} else {
			const userData = {
				...currUser,
				...formData,
			};
			handleUserEdit(userData, encodedToken, dispatch, toast);
			setOpenEditModal(false);
		}
	}
	return (
		<Modal
			isOpen={openEditModal}
			onClose={() => setOpenEditModal(false)}
			scrollBehavior="inside"
			isCentered
			size="xl"
		>
			<ModalOverlay />
			<ModalContent margin={2}>
				<ModalHeader>Fill your Details</ModalHeader>

				<ModalCloseButton />
				<ModalBody>
					<form className="flex flex-col gap-2">
						<div className="mt-4 border p-2">
							<label>
								<p className="flex items-center gap-2 cursor-pointer">
									<span className="font-semibold">Choose Profile: </span>
									<BsImageFill size={25} />
									{formData.picture && (
										<img className="w-[30px]" src={formData.picture} alt="" />
									)}
								</p>
								<input
									type="file"
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											picture: URL.createObjectURL(e.target.files[0]),
										}))
									}
									className="hidden"
								/>
							</label>
							<p>or</p>
							<div className="flex flex-col gap-2 items-start md:flex-row  md:items-center">
								<p className="font-semibold"> Avatar:</p>
								<div className="p-3 shadow-sm shadow-blue-500 flex flex-wrap gap-2 rounded-md justify-center">
									{avatarArr.map((avatar) => (
										<img
											src={avatar}
											alt=""
											className="w-[50px] h-[50px] rounded-[50%] cursor-pointer outline"
											onClick={(e) =>
												setFormData((prev) => ({
													...prev,
													picture: avatar,
												}))
											}
										/>
									))}
								</div>
							</div>
						</div>

						<div className="mt-4 mb-8 border p-2">
							<label className="mt-4">
								<p className="flex items-center gap-2 cursor-pointer">
									<span className="font-semibold">Choose Background: </span>
									<BsImageFill size={25} />
									{formData.bgImg && (
										<img className="w-[30px]" src={formData.bgImg} alt="" />
									)}
								</p>
								<input
									type="file"
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											bgImg: URL.createObjectURL(e.target.files[0]),
										}))
									}
									className="hidden"
								/>
							</label>
							<p>or</p>
							<div className="flex flex-col gap-2 items-start md:flex-row  md:items-center">
								<p className="font-semibold">Wallpaper:</p>
								<div className="p-3 shadow-sm shadow-blue-500 flex flex-wrap gap-2 rounded-md justify-center">
									{backgroundArr.map((avatar) => (
										<img
											src={avatar}
											alt=""
											className="w-[50px] h-[50px] rounded-[50%] cursor-pointer outline"
											onClick={(e) =>
												setFormData((prev) => ({
													...prev,
													bgImg: avatar,
												}))
											}
										/>
									))}
								</div>
							</div>
						</div>

						<input
							type="text"
							placeholder="firstName"
							name="firstName"
							value={formData.firstName}
							onChange={handleFormOnChange}
							className="border border-black rounded-md p-1"
						/>
						<input
							type="text"
							placeholder="lastName"
							name="lastName"
							value={formData.lastName}
							onChange={handleFormOnChange}
							className="border border-black rounded-md p-1"
						/>

						<input
							type="text"
							placeholder="Bio"
							name="bio"
							value={formData.bio}
							onChange={handleFormOnChange}
							className="border border-black rounded-md p-1"
						/>

						<input
							type="url"
							placeholder="website"
							name="website"
							value={formData.website}
							onChange={handleFormOnChange}
							className="border border-black rounded-md p-1"
						/>
						<button
							className="bg-blue-500 text-white m-2 p-1 rounded-md"
							onClick={handleFormSubmit}
						>
							Save
						</button>
					</form>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default EditModal;
