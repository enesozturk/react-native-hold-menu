import React from "react";
import { View } from "react-native";
import { HoldItem } from "../../../react-native-hold-menu";

import styles from './styles'
import { MenuItems } from './constants'

interface PlaygroundProps { }

const Playground = ({ }: PlaygroundProps) => {
    return (
        <View style={styles.container}>
            <View />
            <View style={styles.column}>
                <View style={styles.row}>
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
                <View style={styles.row}>
                    <HoldItem id="item-4" items={MenuItems} menuAnchorPosition="bottom-left">
                        <View style={styles.item}>
                            <View style={[styles.dot, styles.bottomLeft]} />
                        </View>
                    </HoldItem>
                    <HoldItem id="item-5" items={MenuItems} menuAnchorPosition="bottom-center">
                        <View style={styles.item}>
                            <View style={[styles.dot, styles.bottomCenter]} />
                        </View>
                    </HoldItem>
                    <HoldItem id="item-6" items={MenuItems} menuAnchorPosition="bottom-right">
                        <View style={styles.item}>
                            <View style={[styles.dot, styles.bottomRight]} />
                        </View>
                    </HoldItem>
                </View>
            </View>
            <View style={styles.row}>
                <HoldItem id="item-7" items={MenuItems} menuAnchorPosition="bottom-left">
                    <View style={styles.item}>
                        <View style={[styles.dot, styles.bottomLeft]} />
                    </View>
                </HoldItem>
                <HoldItem id="item-8" items={MenuItems} menuAnchorPosition="bottom-center">
                    <View style={styles.item}>
                        <View style={[styles.dot, styles.bottomCenter]} />
                    </View>
                </HoldItem>
                <HoldItem id="item-9" items={MenuItems} menuAnchorPosition="bottom-right">
                    <View style={styles.item}>
                        <View style={[styles.dot, styles.bottomRight]} />
                    </View>
                </HoldItem>
            </View>
        </View>
    );
};

export default Playground;
