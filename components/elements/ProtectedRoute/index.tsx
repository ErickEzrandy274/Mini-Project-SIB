import React, { useEffect, useState } from "react";
import { LayoutProps, LoginModal } from "@elements";
import { useAuth } from "@utils";
import { useDisclosure } from "@chakra-ui/react";

const ProtectedRoute: React.FC<LayoutProps> = ({ children }) => {
	const { isOpen, onClose, onOpen } = useDisclosure();
	const { user } = useAuth();
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		if (!user) {
			onOpen();
			return;
		}

		setIsAuthenticated(true);
	}, [user, onOpen]);

	if (!isAuthenticated) {
		return <LoginModal isOpen={isOpen} onClose={onClose} />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
