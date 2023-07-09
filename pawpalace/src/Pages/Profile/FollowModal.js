import React from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	ModalCloseButton,
	Avatar,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const FollowModal = ({
	openFollowModal,
	setOpenFollowModal,
	followModalData,
}) => {
	const navigate = useNavigate();
	return (
		<Modal
			isOpen={openFollowModal}
			onClose={() => setOpenFollowModal(false)}
			scrollBehavior="inside"
			isCentered
		>
			<ModalOverlay />
			<ModalContent>
				<ModalCloseButton />
				<ModalBody>
					{followModalData.length === 0 && <p>No Users to Show</p>}
					<div className="flex flex-col gap-3">
						{followModalData?.map((user) => {
							return (
								<div
									className="flex items-center justify-between gap-2"
									key={user.id}
								>
									<div className="flex items-center gap-2">
										<div
											onClick={() => {
												setOpenFollowModal(false);
												navigate(`/app/profile/${user._id}`);
											}}
										>
											<Avatar
												size="sm"
												name={user.firstName}
												src={user.picture}
												className="cursor-pointer"
											/>
										</div>

										<div>
											<p className="text-sm font-semibold">
												{user.firstName} {user.lastName}
											</p>
											<p className="text-sm">{user.username}</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default FollowModal;
