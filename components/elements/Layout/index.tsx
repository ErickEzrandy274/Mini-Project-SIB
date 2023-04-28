import React from "react";
import { LayoutProps } from "./interface";
import { Flex } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import { Footer, Navbar } from "@elements";
import toastOptions from "../Toaster";

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<Flex
			flexDirection="column"
			justifyContent="space-between"
			minH="100vh"
			bgGradient="linear(to-br, #f1f5f9, #f3f4f6)"
		>
			<Navbar />
			{children}
			<Footer />
			<Toaster position="top-center" toastOptions={toastOptions} />
		</Flex>
	);
};

export default Layout;
