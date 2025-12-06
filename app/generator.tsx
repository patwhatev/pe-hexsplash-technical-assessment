import { StyleSheet, Text, View, StatusBar, Pressable } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import InfoModal from "@/components/InfoModal";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { isColorDark } from "@/components/IsColorDark";

const Generator = () => {
	const router = useRouter();
	const getRandomHexCode = (): string => {
		const letters = "0123456789ABCDEF";
		let hexCode = "#";
		for (let i = 0; i < 6; i++) {
			hexCode += letters[Math.floor(Math.random() * 16)];
		}
		return hexCode;
	};
	/* useStates: InfoModal's visibility | HexCodes | Locks on Colors */
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [colorCode, setColorCode] = useState<string[]>(Array.from({ length: 5 }, () => getRandomHexCode()));
	const [locks, setLocks] = useState<boolean[]>(new Array(5).fill(false));
	const generateRandomHexCodes = (): void => {
		colorCode.forEach((color, index) => {
			if (!locks[index]) {
				/* 
				Needed to copilot to identify how to only set the color code for one of the views.
				TODO: Revise spread operator and more array methods.
				*/
				setColorCode((prevColorCode) => {
					const newColorCode = [...prevColorCode];
					newColorCode[index] = getRandomHexCode();
					return newColorCode;
				});
			}
		});
	};

	return (
		// Note: Color cell container
		<View style={styles.container} testID="element-palette-container">
			{colorCode.map((color, index) => {
				const colorCellTestID = `action-color-cell-${index}`;
				const colorCellHexTextTestID = `action-color-cell-${index}-text`;
				const colorCellLockTestID = `action-color-cell-${index}-lock`;
				const colorCellLockIcon = `action-color-cell-${index}-lock-icon`;
				
				// NOTE: this is the individual Color cell
				return <Pressable
					key={index}
					testID={colorCellTestID}
					onPress={() =>
						locks[index]
							? null
							: setColorCode((prevColors) => {
									const newColors = [...prevColors];
									newColors[index] = getRandomHexCode();
									return newColors;
							  })
					}
					// Note: Background color of cell in palette
					style={[styles.view, { backgroundColor: color }]}
				>
					{/* Note: Color text */}
					<Text testID={colorCellHexTextTestID} style={[styles.text, { color: isColorDark(color) ? "white" : "black" }]}>{color}</Text>
					{/* Note: Lock icon container */}
					<Pressable
						testID={colorCellLockTestID}
						style={styles.lockContainer}
						onPress={() =>
							setLocks((prevLocks) => {
								const newLocks = [...prevLocks];
								newLocks[index] = !newLocks[index];
								return newLocks;
							})
						}
					>
						{/* Note: Lock Icon */}
						<Ionicons
							testID={colorCellLockIcon}
							name={locks[index] ? "lock-closed" : "lock-open"}
							color={isColorDark(color) ? "white" : "black"}
							size={28}
						/>
					</Pressable>
				</Pressable>
			})}
			<View style={styles.buttonsContainer}>
				{/* Note: info button / modal trigger */}
				<Pressable
					testID="action-view-info"
					onPress={() => {
						setModalVisible(true);
					}}
				>
					<InfoModal
						visible={modalVisible}
						onClose={() => setModalVisible(false)}
					/>
					<Ionicons
						name="information-circle-outline"
						color={"#000000"}
						size={28}
					/>
				</Pressable>
				{/* Note: Settings button */}
				<Pressable testID="action-view-settings" onPress={() => router.push("/settings")}>
					<Ionicons
						name="settings-outline"
						color={"#000000"}
						size={24}
					/>
				</Pressable>
				{/* Note: "Generate" (all unlocked colors) button */}
				<Pressable
					testID="action-generate-all"
					style={styles.button}
					onPress={generateRandomHexCodes}
				>
					<Text style={styles.buttonText}>Generate</Text>
				</Pressable>

				{/* Note: Unlock All button */}
				<Pressable
					testID="action-unlock-all"
					onPress={() => {
						setLocks([false]);
					}}
				>
					<Ionicons
						name="lock-open-outline"
						color={"#000000"}
						size={24}
					/>
				</Pressable>
				{/* Note: Share button */}
				<Pressable
					testID="action-share-palette"
					onPress={() => {
						router.push({
							pathname: "/sharepalette",
							params: {
								colors: JSON.stringify([...colorCode]),
							},
						});
					}}
				>
					<Ionicons
						name="share-outline"
						color={"#000000"}
						size={24}
					/>
				</Pressable>
			</View>
		</View>
	);
};

export default Generator;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	view: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 30,
	},
	text: {
		fontSize: 28,
		fontWeight: "bold",
		flex: 1,
		alignItems: "center",
	},
	buttonsContainer: {
		backgroundColor: Colors.light.background,
		flex: 0.3,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		paddingVertical: 14,
		paddingHorizontal: 5,
	},
	button: {
		paddingHorizontal: 20,
	},
	buttonText: {
		fontSize: 18,
	},
	lockContainer: {
		position: "absolute",
		right: 30,
		padding: 10,
	},
});
