import React from "react";
import BasicInfo from "../../Components/BasicInfo";
import SuggestedPeople from "../../Components/SuggestedPeople";

const ProfileSection = () => {
	return (
		<div className=" hidden sm:block sm:h-full  w-[40%] md:w-[30%]">
			<div className="h-full px-2 flex flex-col items-center">
				<BasicInfo />
				<SuggestedPeople />
			</div>
		</div>
	);
};

export default ProfileSection;
