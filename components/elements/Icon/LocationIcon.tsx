import React from "react";
import { IconProps } from "./interface";

const LocationIcon: React.FC<IconProps> = ({
	className,
	onClick,
	width = 20,
	height = 20,
}) => {
	return (
		<svg
			width={width}
			height={height}
			className={className}
			onClick={onClick}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 48 48"
		>
			<path
				fill="#A0AEC0"
				d="M24 4c-7.73 0-14 6.27-14 14 0 10.5 14 26 14 26s14-15.5 14-26c0-7.73-6.27-14-14-14zm0 19c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"
				className="color000000 svgShape"
			></path>
			<path fill="none" d="M0 0h48v48H0z"></path>
		</svg>
	);
};

export default LocationIcon;
