import React, { BaseSyntheticEvent, useState } from "react";
import {
	Button,
	Card,
	CardBody,
	Flex,
	FormControl,
	Select,
	Text,
} from "@chakra-ui/react";
import { ApplicantCardProps } from "./interface";
import { StatusBadge } from "@elements";
import { statusOptions } from "./constant";
import { useMutation } from "@apollo/client";
import { UPDATE_STATUS_APPLICANT } from "@utils";
import { toast } from "react-hot-toast";
import Link from "next/link";

const ApplicantCard: React.FC<ApplicantCardProps> = ({
	id,
	status,
	name,
	link_url,
}) => {
	const [newStatus, setNewStatus] = useState<
		"none" | "applied" | "under review" | "interviewing"
	>(status);
	const [isUpdate, setIsUpdate] = useState<boolean>(false);
	const [updateApplicantState] = useMutation(UPDATE_STATUS_APPLICANT);

	const handleChange = (e: BaseSyntheticEvent) => {
		setNewStatus(e.target.value);
	};

	const handleSubmit = async (e: BaseSyntheticEvent) => {
		e.preventDefault();
		toast.loading("Updating applicant status...");
		if (newStatus === status) {
			toast.dismiss();
			setIsUpdate(false);
			return toast("Nothing has changed!");
		}

		try {
			await updateApplicantState({ variables: { id, status: newStatus } });
			toast.dismiss();
			toast.success(
				`Successfully updated ${name}'s application status to ${newStatus}`
			);
		} catch (error: any) {
			toast.dismiss();
			toast.error(error.message);
		}
		setIsUpdate(false);
	};

	return (
		<Card
			bgGradient="linear(to-b, #334155, #1f2937)"
			color="gray.200"
			rounded="xl"
		>
			<form onSubmit={handleSubmit}>
				<CardBody
					display="flex"
					flexDirection="column"
					gap={2}
					p={{ base: 3, md: 4 }}
				>
					<Flex justifyContent="space-between" alignItems="center" gap={3}>
						<Text fontSize={{ base: "sm", md: "md" }}>{name}</Text>

						<Button
							colorScheme="twitter"
							letterSpacing="0.2px"
							size="sm"
							rounded="md"
						>
							<Link href={link_url} target="_blank">
								Resume
							</Link>
						</Button>
					</Flex>

					<Flex
						flexDirection={{ base: "column", md: "row" }}
						justifyContent="space-between"
						alignItems={{
							base: isUpdate ? "flex-end" : "flex-start",
							md: "center",
						}}
						gap={2}
					>
						{isUpdate ? (
							<FormControl>
								<Select
									variant="filled"
									id="new_status"
									name="new_status"
									color="black"
									size="sm"
									rounded="md"
									w={{ base: "full", md: "fit-content" }}
									value={newStatus}
									onChange={handleChange}
								>
									{statusOptions.map((value) => {
										return (
											<option key={value} value={value}>
												{value}
											</option>
										);
									})}
								</Select>
							</FormControl>
						) : (
							<StatusBadge status={status} />
						)}

						{isUpdate ? (
							<Flex gap={3}>
								<Button
									colorScheme="red"
									size="sm"
									rounded="md"
									onClick={() => setIsUpdate(false)}
								>
									Cancel
								</Button>

								<Button
									type="submit"
									colorScheme="green"
									size="sm"
									rounded="md"
								>
									Save
								</Button>
							</Flex>
						) : (
							<Button
								colorScheme="facebook"
								letterSpacing="0.2px"
								size="sm"
								rounded="md"
								onClick={() => setIsUpdate(true)}
							>
								Update State
							</Button>
						)}
					</Flex>
				</CardBody>
			</form>
		</Card>
	);
};

export default ApplicantCard;
