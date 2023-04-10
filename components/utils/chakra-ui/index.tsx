import { extendTheme } from "@chakra-ui/react";

const field = {
	backgroundColor: "gray.300",
	border: "none",
	boxShadow: "md",
	_hover: {
		backgroundColor: "gray.400",
	},
	_focus: {
		backgroundColor: "gray.400",
		boxShadow: "none",
	},
};

const theme = extendTheme({
	fonts: {
		body: "'Poppins', sans-serif",
	},
	components: {
		Input: {
			variants: {
				filled: {
					field,
				},
			},
		},
		Select: {
			variants: {
				filled: {
					field,
				},
			},
		},
		Textarea: {
			variants: {
				filled: field,
			},
		},
	},
});

export default theme;
