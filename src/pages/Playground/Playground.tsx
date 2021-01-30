import React from "react";
import { View } from "react-native";
import { HoldItem } from "../../../react-native-hold-menu";

import styles from './styles'
import { MenuItems } from './constants'

interface PlaygroundProps { }

const Playground = ({ }: PlaygroundProps) => {
    return (
        <View style={styles.container}>
            <HoldItem id="item-1" items={MenuItems}>
                <View style={styles.item}>
                    <View style={[styles.dot, styles.topLeft]} />
                </View>
            </HoldItem>
            <HoldItem id="item-2" items={MenuItems}>
                <View style={styles.item}>
                    <View style={[styles.dot, styles.topCenter]} />
                </View>
            </HoldItem>
            <HoldItem id="item-3" items={MenuItems}>
                <View style={styles.item}>
                    <View style={[styles.dot, styles.topRight]} />
                </View>
            </HoldItem>
        </View>
    );
};

export default Playground;
