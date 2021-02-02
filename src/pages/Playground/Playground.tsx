import React from "react";
import { View, Text } from "react-native";
import { HoldItemWrapper } from "../../../react-native-hold-menu";

import styles from './styles'
import { MenuItems } from './constants'

interface PlaygroundProps { }

const Playground = ({ }: PlaygroundProps) => {
    return (
        <View style={styles.container}>
            <View style={[styles.header, styles.row]}>
                <Text style={styles.headerTitle}>React Native Hold Menu</Text>
            </View>
            <View style={styles.column}>
                <View style={styles.row}>
                    <HoldItemWrapper id="item-1" items={MenuItems}>
                        <View style={styles.item}>
                            <View style={[styles.dot, styles.topLeft]} />
                        </View>
                    </HoldItemWrapper>
                    <HoldItemWrapper id="item-2" items={MenuItems}>
                        <View style={styles.item}>
                            <View style={[styles.dot, styles.topCenter]} />
                        </View>
                    </HoldItemWrapper>
                    <HoldItemWrapper id="item-3" items={MenuItems}>
                        <View style={styles.item}>
                            <View style={[styles.dot, styles.topRight]} />
                        </View>
                    </HoldItemWrapper>
                </View>
                {/* <View style={styles.row}>
                    <HoldItemWrapper id="item-4" items={MenuItems} menuAnchorPosition="bottom-left">
                        <View style={styles.item}>
                            <View style={[styles.dot, styles.bottomLeft]} />
                        </View>
                    </HoldItemWrapper>
                    <HoldItemWrapper id="item-5" items={MenuItems} menuAnchorPosition="bottom-center">
                        <View style={styles.item}>
                            <View style={[styles.dot, styles.bottomCenter]} />
                        </View>
                    </HoldItemWrapper>
                    <HoldItemWrapper id="item-6" items={MenuItems} menuAnchorPosition="bottom-right">
                        <View style={styles.item}>
                            <View style={[styles.dot, styles.bottomRight]} />
                        </View>
                    </HoldItemWrapper>
                </View> */}
            </View>
            <View style={[styles.footer, styles.row]}>
                <HoldItemWrapper moveTop={false} id="item-7" items={MenuItems} menuAnchorPosition="bottom-left">
                    <View style={styles.item}>
                        <View style={[styles.dot, styles.bottomLeft]} />
                    </View>
                </HoldItemWrapper>
                <HoldItemWrapper moveTop={false} id="item-8" items={MenuItems} menuAnchorPosition="bottom-center">
                    <View style={styles.item}>
                        <View style={[styles.dot, styles.bottomCenter]} />
                    </View>
                </HoldItemWrapper>
                <HoldItemWrapper moveTop={false} id="item-9" items={MenuItems} menuAnchorPosition="bottom-right">
                    <View style={styles.item}>
                        <View style={[styles.dot, styles.bottomRight]} />
                    </View>
                </HoldItemWrapper>
            </View>
        </View>
    );
};

export default Playground;
