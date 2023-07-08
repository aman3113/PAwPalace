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
import { handleUserEdit } from "../../Utils/api";

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
		const userData = {
			...currUser,
			...formData,
		};
		handleUserEdit(userData, encodedToken, dispatch, toast);
		setOpenEditModal(false);
	}
	return (
		<Modal
			isOpen={openEditModal}
			onClose={() => setOpenEditModal(false)}
			scrollBehavior="inside"
			isCentered
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Fill your Details</ModalHeader>

				<ModalCloseButton />
				<ModalBody>
					<form className="flex flex-col gap-2">
						<label>
							<p className="flex items-center gap-2 cursor-pointer">
								<BsImageFill size={25} />{" "}
								<span className="text-sm">Choose Profile Picture</span>
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
