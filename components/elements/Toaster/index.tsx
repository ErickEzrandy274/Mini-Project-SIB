const toastOptions = {
	duration: 2500,
	style: {
		fontWeight: 700,
		maxWidth: 600,
		color: "white",
		marginTop: "1rem",
		fontSize: "1.25rem",
		letterSpacing: "0.2px",
		borderRadius: "10px",
		padding: ".7rem 1.25rem",
	},
	success: {
		iconTheme: {
			primary: "white",
			secondary: "#2BA32B",
		},
		style: {
			backgroundColor: "#2BA32B",
		},
	},
	error: {
		iconTheme: {
			primary: "white",
			secondary: "#E13B5C",
		},
		style: {
			backgroundColor: "#E13B5C",
		},
	},
	loading: {
		style: {
			backgroundColor: "#727285",
			color: "#F2F4F4",
		},
	},
};

export default toastOptions;
