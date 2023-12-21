import React from 'react';
import { View, StyleSheet } from 'react-native';


const Divider = ({ style, type = 'solid' }) => {
	const dividerStyles = [
		styles.divider,
		style,
		{ borderBottomWidth: type === 'solid' ? 1 : 0.5, borderStyle: type }
	];

	return <View style={dividerStyles} />;
};

const styles = StyleSheet.create({
	divider: {
		borderBottomColor: 'gray'
	}
});

export default Divider;